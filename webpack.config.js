var path = require('path');

module.exports = {
  cache: true,
  entry: {
    admin: "./src/main.js"
  },
  output: {
    path: __dirname + '/dist',
    filename: "app.js"
  },
  resolve: {
    modulesDirectories: [
      'node_modules'
    ]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel?presets[]=es2015',
        include: [
          path.resolve(__dirname, "src")
        ]
      }
    ]
  }
}
