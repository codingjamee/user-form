import { AdminGetProps, AdminPostProps } from "../types/type";
import { adminApi } from "./FetchApi";

const useAdminQueries = () => {
  const postFormApi = ({ body, config }: AdminPostProps) => {
    return adminApi.post({ url: "/forms", body, config });
  };
  const getResponseApi = (params: AdminGetProps) => {
    return adminApi.get({ url: "/responses", config: { ...params } });
  };

  return {
    postFormApi,
    getResponseApi,
  };
};

export default useAdminQueries;
