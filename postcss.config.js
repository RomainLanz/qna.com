const autoprefixer = require('autoprefixer')
const postCSSImport = require('postcss-import')
const postCSSNested = require('postcss-nested')

module.exports = {
  plugins: [postCSSImport(), postCSSNested(), autoprefixer()],
}
