import { userApi } from "./FetchApi";

const useUserQueries = () => {
  const postFormApi = ({ data, config }) => {
    return userApi.post("/", data, config);
  };
  const getFormApi = ({ params }) => {
    return userApi.get("/", { params });
  };

  return {
    postFormApi,
    getFormApi,
  };
};

export default useUserQueries;
