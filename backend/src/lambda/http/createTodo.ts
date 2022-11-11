import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import { CreateTodoRequest } from "../../requests/CreateTodoRequest";
import { createToDo } from "../../businessLogic/ToDo";
import { createLogger } from "../../utils/logger";

const logger = createLogger("Create todo");

export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log("Processing Event ", event);

  const authorization = event.headers.Authorization;
  const split = authorization.split(" ");
  const jwtToken = split[1];

  const newTodo: CreateTodoRequest = JSON.parse(event.body);
  logger.info("Creating new todo", newTodo);
  const toDoItem = await createToDo(newTodo, jwtToken);

  return {
    statusCode: 201,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      item: toDoItem,
    }),
  };
};
