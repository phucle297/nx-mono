const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin')
const { join } = require('path')

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/ec-product-svc')
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/index.ts',
      tsConfig: './tsconfig.lib.json',
      assets: [
        {
          input: '../../libs/ec-proto/src/proto/',
          glob: '**/*.proto',
          output: './'
        }
      ],
      watchAssets: true,
      optimization: false,
      outputHashing: 'none',
      generatePackageJson: true
    })
  ]
}
