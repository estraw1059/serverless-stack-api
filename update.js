import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
	const data = JSON.parse(event.body);
	const params = {
		TableName: process.env.TableName,
		//Key defines the partition key and sort key of the item to be updated
		//userId is the ID
		//NoteId Path Parameter
		Key: {
			userId: event.requestContext.identity.cognitoIdentityId,
			noteId: event.pathParameters.id
		},
		//'Update Expression' defines the attributes to be updated
		//'ExpressionAttributeValues' defines the value in the update expression
		UpdateExpression: "SET content = :content, attachment = :attachment",
		ExpressionAttributeValues: {
			":attachment" : data.attachment || null,
			":content" : data.content || null
		},
		//'Return Values' specifies if an dhow to return the item's attributes,
		//All_New returns all attribute of the item after the update
		//inpsect 'results below to see how it works with different setting'
		ReturnValues: "ALL_NEW"
	};

	await dynamoDb.update(params);

	return {status: true};
});