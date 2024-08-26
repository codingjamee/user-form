import { GetProps, postResponseApiProps } from "../types/type";
import { userApi } from "./FetchApi";

const useUserQueries = () => {
  const postResponseApi = ({ body, config }: postResponseApiProps) => {
    return userApi.post({
      url: `/responses?formId=${config?.formId}`,
      body,
      config,
    });
  };
  const getFormApi = (params: GetProps) => {
    return userApi.get({ url: "/forms", config: { ...params } });
  };

  return {
    postResponseApi,
    getFormApi,
  };
};

export default useUserQueries;
