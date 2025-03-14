const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin')
const { join } = require('path')

module.exports = {
  output: {
    path: join(__dirname, '../../dist/libs/ec-services-sdk')
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/index.ts',
      tsConfig: './tsconfig.lib.json',
      assets: [
        {
          input: '../../libs/ec-domain/',
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
