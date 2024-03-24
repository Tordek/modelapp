// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getService } from "@/data/service";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | string>
) {
  const params = req.query;
  const service = getService();
  const id = params.id as string;

  switch (req.method) {
    case "GET": {
      const data = await service.getTodo(id);

      res.json({ data });
      break;
    }

    case "PUT": {
      const body = req.body;

      const data = await service.patchTodo(id, body);

      res.json({ data });
      break;
    }

    case "DELETE": {
      const data = await service.deleteTodo(id);

      res.json({ data });
      break;
    }

    default: {
      res.status(405).send("Invalid method");
    }
  }
}
