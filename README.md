# fastify-dynamoDB

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)
[![Build Status](https://travis-ci.org/matrus2/fastify-dynamodb.svg?branch=master)](https://travis-ci.org/matrus2/fastify-dynamodb) 

This plugin shares [AWS.DynamoDB.DocumentClient()](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html) object for the easy use with fastify.

## Install
```
npm i fastify-dynamodb -S
```
## Usage
Add it to you project with `register` and you are done!  
You can access the *DynamoDB DocumentClient* via `fastify.dynamo`.
```js
const fastify = require('fastify')

fastify.register(require('fastify-dynamodb'), {
    endpoint: 'http://localhost:8000',
    region: AWS_REGION
  }, err => {
  if (err) throw err
})

fastify.listen(3000, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
```

In your route file you can simply do all gets, queries, scans e.g.:

```js
async function singleRoute(fastify, options) {
  fastify.get(
    '/users/:id',
    async (request, reply) => {
      let data
      const { id } = request.params;
      const params = {
        TableName: TABLE_NAME,
        Key: {
          user_id: id
        },
      };
      try {
        data = await fastify.dynamo.get(params).promise();
      } catch (e) {
        console.log(e)
      }
      return { data }
    },
  )
}
```

## License

Licensed under [MIT](./LICENSE).