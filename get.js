import handler from "./libs/handler-lib";
import dynamoDb from "./libs/dynamodb-lib";

export const main = handler(async (event, context) => {
	const params = {
		TableName: process.env.tableName,
		//'Key' Definies the partition key and sort key of the item to be retrieved
		// - userid
		// - noteid: path parameter
		Key:
		{
			userId: event.requestContext.identity.cognitoIdentityId,
			noteId: event.pathParameters.id
		}
	};

	const result = await dynamoDb.get(params);
	if ( ! result.Item)
	{
		throw new Error("Item Not Found");
	}

	//Return the Item
	return result.Item;
});