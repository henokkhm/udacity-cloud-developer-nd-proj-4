import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from "aws-lambda";
import { generateUploadUrl } from "../../businessLogic/ToDo";

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log("Processing Event ", event);
  const todoId = event.pathParameters.todoId;

  const URL = await generateUploadUrl(todoId);

  return {
    statusCode: 202,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      uploadUrl: URL,
    }),
  };
};
