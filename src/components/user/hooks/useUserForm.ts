import { useEffect, useState } from "react";
import { FormAnswer, FormPageData } from "../../../types/type";
import { createDefaultUserFormObj } from "../../../util/utils";
import useUserQueries from "../../../hooks/useUserQueries";

const useUserForm = ({ formId }: { formId?: string }) => {
  const [data, setData] = useState<FormPageData>();
  const { getFormApi } = useUserQueries();

  const getFormData = async () => {
    try {
      const result = await getFormApi(formId ? { formId: formId } : {});
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

const usePostResponse = ({ formId }: { formId?: string }) => {
  const [groupOption, setGroupOption] = useState<FormAnswer | undefined>({
    questionId: formId,
    responses: createDefaultUserFormObj().responses,
  });
  return { groupOption, setGroupOption };
};

export { useUserForm as default, usePostResponse };
