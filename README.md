# fastify-dynamoDB

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)
[![Build Status](https://travis-ci.org/matrus2/fastify-dynamodb.svg?branch=master)](https://travis-ci.org/matrus2/fastify-dynamodb) 

This plugin shares [AWS.DynamoDB.DocumentClient()](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html) object, so you can easy use DynamoBD with fastify.

## Install
```
npm i fastify-dynamodb -S
```
## Usage
Add it to you project with `register` and you are done!  
You can access the [*DynamoDB DocumentClient*](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/modules/_aws_sdk_lib_dynamodb.html) via `fastify.dynamo`. The [low-level client](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/index.html) is also available via `fastify.dynamoClient`.
```js
const fastify = require('fastify')()

fastify.register(require('fastify-dynamodb'), {
    endpoint: 'http://localhost:8000',
    region: AWS_REGION
  })

fastify.listen(3000, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})
```

In your route file you can use the dynamodb client to perform queries:
For further documentation on querying, see the [DynamoDBDocumentClient docs](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/dynamodb-example-dynamodb-utilities.html).

```js
const { GetCommand } = require("@aws-sdk/lib-dynamodb")

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
        data = await fastify.dynamo.send(new GetCommand(params));
      } catch (e) {
         reply.send(e)
      }
      return { data }
    },
  )
}
```

## License

Licensed under [MIT](./LICENSE).
