const path = require('path')
const swaggerUi = require('swagger-ui-express')
const express = require('express')
const YamlJS = require('yamljs')
//import basicAuth from 'express-basic-auth'


const docsRouter = express.Router()

const docsPath = path.resolve(__dirname, '../docs/spec.yaml')
const swaggerDocument = YamlJS.load(docsPath)


// const basicAuthMiddleware = basicAuth({
//   users: {
//     [process.env.DOCS_BASIC_AUTH_USERNAME]: process.env.DOCS_BASIC_AUTH_PASSWORD
//   },
//   challenge: true,
//   unauthorizedResponse: 'Sorry. You do not have access to this page.'
// })


docsRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

module.exports = docsRouter   