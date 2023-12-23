const path = require('path')
const swaggerUi = require('swagger-ui-express')
const express = require('express')
const YamlJS = require('yamljs')


const docsRouter = express.Router()

const docsPath = path.resolve(__dirname, '../docs/spec.yaml')
const swaggerDocument = YamlJS.load(docsPath)



docsRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

module.exports = docsRouter
  