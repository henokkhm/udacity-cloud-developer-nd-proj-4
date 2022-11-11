import "source-map-support/register";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult,
} from "aws-lambda";
import { UpdateTodoRequest } from "../../requests/UpdateTodoRequest";
import { updateToDo } from "../../businessLogic/ToDo";
import { createLogger } from "../../utils/logger";

const logger = createLogger("Update todo");
export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log("Processing Event ", event);
  const authorization = event.headers.Authorization;
  const split = authorization.split(" ");
  const jwtToken = split[1];

  const todoId = event.pathParameters.todoId;
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body);
  logger.info("Updating todo ", updatedTodo);

  const toDoItem = await updateToDo(updatedTodo, todoId, jwtToken);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      item: toDoItem,
    }),
  };
};
