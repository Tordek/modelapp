import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { Config, getConfig } from "./config";

/**
 * Wraps calls to the backend API.
 */
class Service {
  public constructor(private readonly config: Config) {}

  public async getTodos() {
    const response = await fetch(`${this.config.apiHost}/todo`);

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  }

  public async postTodo(payload: CreateTodoPayload) {
    const response = await fetch(`${this.config.apiHost}/todo`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  }

  public async getTodo(id: string) {
    const response = await fetch(`${this.config.apiHost}/todo/${id}`);

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  }

  public async patchTodo(id: string, payload: UpdateTodoPayload) {
    const response = await fetch(`${this.config.apiHost}/todo/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  }

  public async deleteTodo(id: string) {
    const response = await fetch(`${this.config.apiHost}/todo/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    return response.json();
  }
}

export type { Service };

let serviceInstance: Service | null = null;
export const getService = () => {
  if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) {
    throw new Error("It makes no sense to call this at this phase.");
  }

  const config = getConfig();

  if (serviceInstance === null) {
    serviceInstance = new Service(config);
  }

  return serviceInstance;
};

export interface CreateTodoPayload {
  title: string;
  dueDate: Date | null;
  done: boolean;
}

export interface UpdateTodoPayload {
  title?: string;
  dueDate?: Date | null;
  done?: boolean;
}
