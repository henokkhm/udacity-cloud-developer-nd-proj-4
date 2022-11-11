import "source-map-support/register";

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler,
} from "aws-lambda";
import { getAllToDo } from "../../businessLogic/ToDo";
import { createLogger } from "../../utils/logger";

const logger = createLogger("Get todos");
export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log("Processing Event ", event);
  const authorization = event.headers.Authorization;
  const split = authorization.split(" ");
  const jwtToken = split[1];
  logger.info("Getting all todos");

  const toDos = await getAllToDo(jwtToken);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      items: toDos,
    }),
  };
};
