const path = require('path')
const webpack = require('path')
const HTMLWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const TerserPlugin = require("terser-webpack-plugin")
const WorkerSerivce = require('workbox-webpack-plugin')
const {CleanWebpackPlugin} = require("clean-webpack-plugin")


module.exports ={
  entry:"./src/client/index.js",
  mode:'production',
  optimization: {
    minimizer: [
        new TerserPlugin({}), 
        new OptimizeCSSAssetsPlugin({})
    ],
},
  output:{
    libraryTarget:"var",
    library:"Client"
  },
  module:{
    rules: [
      {
        test: '/\.js$/',
        exclude: '/node_module/',
        loader: "babel-loader"
      },
      {
        test: /\.scss$/ ,
        use : [`${MiniCssExtractPlugin.loader}`, 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new HTMLWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename:"[name].css"
    }),
    new WorkerSerivce.GenerateSW({}),
    new CleanWebpackPlugin({
      // Simulate the removal of files
      dry: true,
      // Write Logs to Console
      verbose: true,
      // Automatically remove all unused webpack assets on rebuild
      cleanStaleWebpackAssets: true,
      protectWebpackAssets: false
    })
  ]
}