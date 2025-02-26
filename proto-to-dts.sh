#!/bin/bash
# Base directory containing all domain subdirectories
BASE_DIR="./libs/ec-domain"

# Find all proto directories in the structure /libs/ec-domain/**/src/proto/
find "$BASE_DIR" -type d -path "*/src/proto" | while read -r PROTO_DIR; do
  # Determine the root domain directory (i.e., strip `/src/proto`)
  DOMAIN_DIR="${PROTO_DIR%/src/proto}"

  # Ensure output directory exists
  TS_OUT_DIR="$DOMAIN_DIR/src/types/proto/"
  mkdir -p "$TS_OUT_DIR"

  TS_OUT_FILE="$TS_OUT_DIR/index.ts"

  echo "Processing proto files in $PROTO_DIR..."

  # Remove existing generated file
  rm -f "$TS_OUT_FILE"

  # Find all .proto files and generate TypeScript definitions
  find "$PROTO_DIR" -name "*.proto" -type f | while read -r proto_file; do
    echo "Compiling $proto_file..."

    protoc \
      --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts_proto \
      --ts_proto_out="$TS_OUT_DIR" \
      --ts_proto_opt=env=node,nestJs=true,esModuleInterop=true \
      -I "$PROTO_DIR" \
      "$proto_file" \
      --experimental_allow_proto3_optional
  done

  # Remove `export const protobufPackage = "...";` from generated files
  find "$TS_OUT_DIR" -type f -name "*.ts" -not -name "index.ts" | while read -r ts_file; do
    sed -i '/^export const protobufPackage = /d' "$ts_file"
  done

  # Generate a single `proto.ts` file exporting all generated types
  echo "// Auto-generated index file" > "$TS_OUT_FILE"

  find "$TS_OUT_DIR" -name "*.ts" -not -name "index.ts" -type f | \
    awk -F/ '{print $NF}' | sed 's/\.ts$//' | sort | uniq | while read -r module_path; do
    echo "export * from './$module_path';" >> "$TS_OUT_FILE"
  done
  echo "Done processing $PROTO_DIR -> $TS_OUT_FILE"
done

echo "All TypeScript definitions generated successfully!"

