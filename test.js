const t = require('tap')
const test = t.test
const Fastify = require('fastify')
const fastifyDynamoDB = require('./index')

test('fastify.dynamo and fastify.dynamoClient should exist', t => {
  const fastify = Fastify()

  fastify.register(fastifyDynamoDB, {
    endpoint: 'localhost:8080',
    region: 'us-east-1'
  }, err => {
    t.error(err)
  })

  fastify.ready(err => {
    t.error(err)
    t.ok(fastify.dynamo)
    t.ok(fastify.dynamoClient)
    fastify.close()
    t.end()
  })
})
