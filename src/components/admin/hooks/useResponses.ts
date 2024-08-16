import { useEffect, useState } from "react";
import useAdminQueries from "../../../hooks/useAdminQueries";

const useResponses = ({ formId }: { formId?: string }) => {
  const [summary, setSummary] = useState();

  const { getResponseApi } = useAdminQueries();

  const fetchResponseFn = async () => {
    try {
      //params 넣어주기
      const result = await getResponseApi({ formId });
      // const data = await result.json();
      const data = await result.json();
      console.log(data);
      if (data.ok) {
        console.log(data);
        setSummary(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchResponseFn();
  }, []);

  return { summary, fetchResponseFn };
};

export default useResponses;
