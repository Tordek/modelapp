import { getApi } from "@/data/api";
import { CreateTodoPayload, getService } from "@/data/service";
import { useMutation } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useCallback, useState } from "react";

interface HomeProps {
  someData: string;
}
export default function Home({ someData }: HomeProps) {
  const createMutation = useMutation({
    mutationFn: async (body: CreateTodoPayload) => {
      const api = getApi();

      return api.postTodo(body);
    },
  });

  const [title, setTitle] = useState("");

  const create = useCallback(
    () => createMutation.mutate({ done: false, dueDate: null, title }),
    [createMutation.mutate]
  );

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="A great sample app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <button onClick={create}>Create</button>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const service = getService();

  const someData = await service.getTodos();

  return {
    props: {
      someData,
    },
  };
};
