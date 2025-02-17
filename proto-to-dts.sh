#!/bin/bash
# Set the source and destination directories
PROTO_DIR="./libs/ec-proto/src/proto"
TS_OUT_DIR="./libs/ec-proto/src/types"


# Clean up by removing the entire output directory
rm -rf "$TS_OUT_DIR"

# Recreate the output directory
mkdir -p "$TS_OUT_DIR"

# Find all .proto files in the PROTO_DIR and generate TypeScript definitions
find "$PROTO_DIR" -name "*.proto" -type f | while read -r proto_file; do
  echo "Processing $proto_file..."

  protoc \
    --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts_proto \
    --ts_proto_out="$TS_OUT_DIR" \
    --ts_proto_opt=env=node,nestJs=true,esModuleInterop=true \
    -I "$PROTO_DIR" \
    "$proto_file"\
    --experimental_allow_proto3_optional
    # --ts_proto_opt=outputServices=grpc-js,env=node,esModuleInterop=true,nestJs=true \
done

# Create index.ts to export all generated .ts files
echo "// Auto-generated index file" > "$TS_OUT_DIR/index.ts"

# Find all .ts files except index.ts and add export statements to index.ts
find "$TS_OUT_DIR" -name "*.ts" -not -name "index.ts" -type f | while read -r ts_file; do
  # Get the relative path from TS_OUT_DIR
  rel_path=$(realpath --relative-to="$TS_OUT_DIR" "$ts_file")

  # Convert to module path (remove .ts extension)
  module_path=${rel_path%.ts}

  # Add export statement to index.ts
  echo "export * from './$module_path';" >> "$TS_OUT_DIR/index.ts"
done

echo "Done! TypeScript definitions generated and index.ts updated using ts-proto."
