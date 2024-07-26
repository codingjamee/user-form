import { adminApi } from "./FetchApi";

const useAdminQueries = () => {
  const postFormApi = ({ data, config }) => {
    return adminApi.post("/", data, config);
  };
  const getFormApi = ({ params }) => {
    return adminApi.get("/", { params });
  };

  return {
    postFormApi,
    getFormApi,
  };
};

export default useAdminQueries;
