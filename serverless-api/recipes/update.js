'use strict';
const AWS = require('aws-sdk'); 
const dynamoDb = new AWS.DynamoDB.DocumentClient();
module.exports.update = (event, context, callback) => {
  const data = JSON.parse(event.body);
  if (typeof data.recipename !== 'string' || typeof data.supplies !== 'string' || typeof data.rules !== 'string' || typeof data.steps !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Recipe is not updated'));
    return;
  }

  const params = {
TableName: 'RECIPE',
Item: {
id: event.pathParameters.id,
recipename: data.recipename,
supplies:data.supplies,
rules:data.rules,
steps:data.steps
    }
    
  }
    
dynamoDb.put(params, (error, result) =>{
    if (error){
      console.error(error)
      callback(new Error('Recipe is not updated'))
      return;
      
    }
const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item),
    };
    callback(null, response);
  });
};