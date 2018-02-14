'use strict';
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
module.exports.delete = (event, context, callback) => {
  const params = {
    TableName: 'RECIPE',
    Key: {
      id: event.pathParameters.id,
    },
  };

 dynamoDb.get(params, (error, result) => {
if (error) {
console.error(error);
callback(new Error('Recipe is not deleted.'));
     return;
    }

const response = {
statusCode: 200,
body: JSON.stringify({}),
    };
    callback(null, response);
  });
};