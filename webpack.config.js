const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = env => {
  return {
    entry: './src/main.js',
    devServer: {
      static: {
      	directory: path.join(__dirname, 'dist'),
      	watch: true
      },
      compress: true,
      port: 3000
    },
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new Dotenv({
        path: './.env', 
        safe: true ,
        systemvars: true,
      })
    ]
  };
};