const t = require('tap')
const test = t.test
const Fastify = require('fastify')
const fastifyDynamoDB = require('./index')

test('fastify.db should exist', t => {
  t.plan(3)

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
    fastify.close()
  })
})
