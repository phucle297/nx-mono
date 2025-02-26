const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin')
const { join } = require('path')

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/ec-api-gateway')
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: [
        {
          input: '../../libs/ec-domain/products/src/proto/',
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
