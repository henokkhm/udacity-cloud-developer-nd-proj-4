import { TodoItem } from "../models/TodoItem";
import { parseUserId } from "../auth/utils";
import { CreateTodoRequest } from "../requests/CreateTodoRequest";
import { UpdateTodoRequest } from "../requests/UpdateTodoRequest";
import { TodoUpdate } from "../models/TodoUpdate";
import { ToDoAccess } from "../dataLayer/ToDoAccess";

const uuidv4 = require("uuid/v4");
const toDoAccess = new ToDoAccess();

export async function getAllToDo(jwtToken: string): Promise<TodoItem[]> {
  const userId = parseUserId(jwtToken);
  return toDoAccess.getAllToDo(userId);
}

export function createToDo(
  createTodoRequest: CreateTodoRequest,
  jwtToken: string
): Promise<TodoItem> {
  const userId = parseUserId(jwtToken);
  const todoId = uuidv4();

  return toDoAccess.createToDo({
    userId: userId,
    todoId: todoId,
    attachmentUrl: "",
    // attachmentUrl: "",
    // Since the user doesn't upload an image when they create a todo, we set this to empty
    // Later, if they upload an image, a PATCH request will update the attachmentUrl
    createdAt: new Date().getTime().toString(),
    done: false,
    ...createTodoRequest,
  });
}

export function updateToDo(
  updateTodoRequest: UpdateTodoRequest,
  todoId: string,
  jwtToken: string
): Promise<TodoUpdate> {
  const userId = parseUserId(jwtToken);
  return toDoAccess.updateToDo(updateTodoRequest, todoId, userId);
}

export function deleteToDo(todoId: string, jwtToken: string): Promise<string> {
  const userId = parseUserId(jwtToken);
  return toDoAccess.deleteToDo(todoId, userId);
}

export function generateUploadUrl(todoId: string): Promise<string> {
  return toDoAccess.generateUploadUrl(todoId);
}
