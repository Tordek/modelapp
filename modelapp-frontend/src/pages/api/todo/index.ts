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
  const service = getService();

  switch (req.method) {
    case "GET": {
      const data = await service.getTodos();

      res.json({ data });
      break;
    }

    case "POST": {
      const body = req.body;

      const data = await service.postTodo(body);

      res.json({ data });
      break;
    }

    default: {
      res.status(405).send("Invalid method");
    }
  }
}
