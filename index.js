const fp = require('fastify-plugin')
const { DocumentClient } = require('aws-sdk/clients/dynamodb')

function db (fastify, options = {}, next) {
  const docClient = new DocumentClient(options)
  if (!fastify.dynamo) {
    fastify.decorate('dynamo', docClient)
  }
  next()
}

module.exports = fp(db)
