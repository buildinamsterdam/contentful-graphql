import compress from "gql-compress";

type SomeObject = Record<string | number | symbol, any>;

export type CreateClientArgs = {
  baseUrl?: string;
  environment?: string;
  accessToken: string;
  previewKey?: string;
  spaceId: string;
};

export type MakeQueryArgs = {
  query: string;
  variables: Record<string | symbol | number, string | number | boolean>;
  config?: RequestInit;
};

/**
 * @function createClient
 * @description Generate a client to make GraphQL requests
 */
export const createClient = (args: CreateClientArgs) => {
  const clientArgs = {
    baseUrl: "https://graphql.contentful.com/content",
    environment: "master",
    previewKey: "",
    ...args,
  };

  return async <T extends SomeObject>(args: MakeQueryArgs): Promise<T> => {
    const res = await fetch(
      `${clientArgs.baseUrl}/v1/spaces/${clientArgs.spaceId}/environments/${clientArgs.environment}`,
      {
        ...args.config,
        method: "POST",
        headers: {
          ...args?.config?.headers,
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            args.variables?.preview && clientArgs.previewKey
              ? clientArgs.previewKey
              : clientArgs.accessToken
          }`,
        },
        body: JSON.stringify({
          query: compress(args.query),
          variables: args.variables,
        }),
      }
    );
    const { data, errors = [] } = await res.json();

    if (errors.length > 0) throw new Error(JSON.stringify(errors));

    return data;
  };
};
