import { AdminApiProps, Params, PostProps } from "../types/type";

const mutateObjToParams = (paramsObj: Params) => {
  return Object.entries(paramsObj).reduce(
    (prev, [key, value]) => prev.concat(`?${key}=${value}`),
    ""
  );
};

const fetchApi = {
  create: ({ baseURL, headers }: AdminApiProps) => {
    return {
      post: ({ url, body, config }: PostProps) =>
        fetch(`${baseURL}${url}`, {
          method: "POST",
          ...config,
          headers: { ...headers, ...config?.headers },
          body: JSON.stringify(body),
        }),
      get: ({ url, config }: PostProps) => {
        const queryString = mutateObjToParams(config);
        return fetch(`${baseURL}${url}${queryString}`, {
          method: "GET",
          headers: { ...headers },
        });
      },
      // delete: ({ url, data, config }: PostProps) =>
      //   fetch(`${baseURL}${url}`, {
      //     method: "DELETE",
      //     headers: { ...headers, ...config?.headers },
      //     body: JSON.stringify(data),
      //   }),
      // put: ({ url, data, config }: PostProps) =>
      //   fetch(`${baseURL}${url}`, {
      //     method: "PUT",
      //     headers: { ...headers, ...config?.headers },
      //     body: JSON.stringify(data),
      //   }),
    };
  },
};

const adminApi = fetchApi.create({
  baseURL: "/api/admin",
  headers: { "Content-Type": "application/json" },
});

const userApi = fetchApi.create({
  baseURL: "/api/user",
  headers: { "Content-Type": "application/json" },
});

export { adminApi, userApi };
