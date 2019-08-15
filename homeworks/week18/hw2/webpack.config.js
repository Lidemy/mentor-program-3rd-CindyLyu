const path = require('path');

module.exports = {
  entry: ['./index.js', './utils.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.min.js',
  },
};
