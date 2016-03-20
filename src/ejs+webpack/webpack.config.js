var webpack = require('webpack');

module.exports = {
  entry: {
    index: "./src/scripts/index.js",
    a: "./src/scripts/a.js",
    b: "./src/scripts/b.js",
    c: "./src/scripts/c.js",
    vendor: ["jquery"]
  },
  output: {
    path: './public',
    filename: "[name].js"
  },
  module: {
    loaders: [
      {test: /\.css$/, loaders: ["style", "css"]},
    ]
  },
  plugins: [

    new webpack.optimize.CommonsChunkPlugin("common-a-b.js", ["a", "b"]),

    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.bundle.js"
    })

  ],
  resolve: {
    alias: {
      bootstrapDatepicker: "../../bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.js",
      "bootstrap-datepicker-css": "../../bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.standalone.css"
    }
  }
};