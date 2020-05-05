const path = require('path');

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './src/index.ts'],

  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: './',
  },
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        //kako ce se obraditi fajlovi
        test: /\.(js|ts)$/, //regularni izraz $-ako se string zavrsava sa tom reci
        exclude: /(node_modules|bower_components)/, //da ne trazi node_modules jer ima mng fajlova
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/typescript'],
          },
        },
      },
    ],
  },
};
