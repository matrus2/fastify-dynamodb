const fp = require('fastify-plugin')
const AWS = require('aws-sdk')

function db (fastify, options = {}, next) {
  AWS.config.update({
    ...options
  })
  const docClient = new AWS.DynamoDB.DocumentClient()
  if (!fastify.dynamo) {
    fastify.decorate('dynamo', docClient)
  }
  next()
}

module.exports = fp(db)
