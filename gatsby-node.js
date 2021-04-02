const path = require('path')

exports.createSchemaCustomization = require('./src/gatsby/node/createSchemaCustomization')
exports.createPages = require('./src/gatsby/node/createPages')

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  })
}
