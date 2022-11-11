import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from "aws-lambda";
import { generateUploadUrl } from "../../businessLogic/ToDo";
import { createLogger } from "../../utils/logger";

const logger = createLogger("Generate upload Url");
export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log("Processing Event ", event);
  const todoId = event.pathParameters.todoId;
  logger.info("Generating upload url for todo with id ", todoId);

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
