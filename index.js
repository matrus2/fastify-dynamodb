const fp = require('fastify-plugin')
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb')
const { DynamoDBDocumentClient } = require('@aws-sdk/lib-dynamodb')

async function db (fastify, options = {}) {
  // split the options for the low level client vs the document client
  const { marshallOptions, unMarhsallOptions, ...lowLevelOptions } = options
  const client = new DynamoDBClient(lowLevelOptions)
  const docClient = DynamoDBDocumentClient.from(client, { marshallOptions, unMarhsallOptions })
  fastify.decorate('dynamo', docClient)
  fastify.decorate('dynamoClient', client)

  fastify.addHook('onClose', async (fastify) => client.destroy())
}

module.exports = fp(db)
