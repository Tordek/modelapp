import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { CreateTodoPayload, UpdateTodoPayload } from "./service";

/**
 * Wraps calls from the frontend to the API.
 */
class Api {
  public constructor() {}

  public async getTodos() {
    const result = await fetch("/api/todo");

    if (!result.ok) {
      throw new Error(await result.text());
    }

    return result.json();
  }

  public async postTodo(payload: CreateTodoPayload) {
    const result = await fetch("/api/todo", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!result.ok) {
      throw new Error(await result.text());
    }

    return result.json();
  }

  public async getTodo(id: string) {
    const result = await fetch(`/api/todo/${id}`);

    if (!result.ok) {
      throw new Error(await result.text());
    }

    return result.json();
  }

  public async patchTodo(id: string, payload: UpdateTodoPayload) {
    const result = await fetch(`/api/todo/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!result.ok) {
      throw new Error(await result.text());
    }

    return result.json();
  }

  public async deleteTodo(id: string) {
    const result = await fetch(`/api/todo/${id}`, {
      method: "DELETE",
    });

    if (!result.ok) {
      throw new Error(await result.text());
    }

    return result.json();
  }
}

export type { Api };

let apiInstance: Api | null = null;
export const getApi = () => {
  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    throw new Error("It makes no sense to call this at this phase.");
  }

  if (apiInstance === null) {
    apiInstance = new Api();
  }

  return apiInstance;
};
