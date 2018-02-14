'use strict';
const uuid = require('uuid');
const AWS = require('aws-sdk')
const dynamoDb = new AWS.DynamoDB.DocumentClient();
module.exports.create = (event, context, callback) => {
const data = JSON.parse(event.body);
if (typeof data.recipename !== 'string' || typeof data.supplies !== 'string' || typeof data.rules !== 'string' || typeof data.steps !== 'string') {
console.error('Validation Failed');
callback(new Error('recipe is not created'));
return;
  }
const params = {
    TableName: 'RECIPE',
    Item: {
      id: uuid.v1(),
      recipename: data.recipename,
      supplies:data.supplies,
      rules:data.rules,
      steps:data.steps
    }
    
  }
dynamoDb.put(params, (error, result) =>{
if (error){
console.error(error)
      callback(new Error('recipe is not created'))
      return;
      
    }
const response = {
    statusCode: 200,
    body: JSON.stringify(result.Item)
    }
    callback(null, response)
  })
}
  