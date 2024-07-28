import { useEffect, useState } from "react";
import useAdminQueries from "../../../hooks/useAdminQueries";
import { FormPageData } from "../../../types/type";

const useUserForm = ({ formId }: { formId?: string }) => {
  const [data, setData] = useState<FormPageData>();
  const { getResponseApi } = useAdminQueries();

  const getFormData = async () => {
    try {
      const result = await getResponseApi({ formId: formId });
      const resultText = await result.json();
      setData(resultText);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFormData();
  }, []);

  return { data };
};

export default useUserForm;
