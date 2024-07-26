interface AdminApiProps {
  baseURL?: string;
  headers?: any;
}

interface PostProps {
  url: string;
  data?: any;
  config?: any;
}

const fetchApi = {
  create: ({ baseURL, headers }: AdminApiProps) => {
    return {
      post: ({ url, data, config }: PostProps) =>
        fetch(`${baseURL}/${url}`, {
          method: "POST",
          ...config,
          headers: { ...headers, ...config?.headers },
          body: JSON.stringify(data),
        }),
      get: ({ url, config }: PostProps) =>
        fetch(`${baseURL}/${url}`, {
          method: "GET",
          ...config,
          headers: { ...headers, ...config?.headers },
        }),
      delete: ({ url, data, config }: PostProps) =>
        fetch(`${baseURL}/${url}`, {
          method: "DELETE",
          headers: { ...headers, ...config?.headers },
          body: JSON.stringify(data),
        }),
      put: ({ url, data, config }: PostProps) =>
        fetch(`${baseURL}/${url}`, {
          method: "PUT",
          headers: { ...headers, ...config?.headers },
          body: JSON.stringify(data),
        }),
    };
  },
};

const adminApi = fetchApi.create({
  baseURL: "/forms",
  headers: { "Content-Type": "application/json" },
});

const userApi = fetchApi.create({
  baseURL: "",
  headers: { "Content-Type": "application/json" },
});

export { adminApi, userApi };
