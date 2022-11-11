import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from "aws-lambda";
import { deleteToDo } from "../../businessLogic/ToDo";
import { createLogger } from "../../utils/logger";

const logger = createLogger("Delete todo");

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log("Processing Event ", event);
  const authorization = event.headers.Authorization;
  const split = authorization.split(" ");
  const jwtToken = split[1];

  const todoId = event.pathParameters.todoId;
  logger.info("Deleting todo with id ", todoId);

  const deleteData = await deleteToDo(todoId, jwtToken);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: deleteData,
  };
};
