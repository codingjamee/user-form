import { useEffect, useState } from "react";
import { FormPageData, FormsAnswerData } from "../../../types/type";
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

  return { data, setData };
};

const usePostResponse = ({ data }: { data: FormPageData | undefined }) => {
  const [answer, setAnswer] = useState<FormsAnswerData[]>(
    (data &&
      data.forms.map((form) => ({
        id: form.id,
        required: form.required ? form.required : false,
        answers: [],
      }))) ??
      []
  );

  //초깃값을 설정하기... data가 왔을 때 초깃값 설정하는 것 useEffect말고 다른것이 있을지?
  useEffect(() => {
    data &&
      setAnswer(
        data.forms.map((form) => ({
          id: form.id,
          answers: [],
          required: form.required ? form.required : false,
        }))
      );
  }, [data]);

  useEffect(() => {
    console.log(answer);
  }, [answer]);

  const onChangeDataFn = ({
    type,
    value,
    dataId,
    formId,
  }: {
    type: "1" | "2" | "3";
    value: string;
    dataId: string;
    formId: string;
  }) => {
    const newForms: FormsAnswerData[] = answer ? [...answer] : [];
    const changedForms = newForms.find((form) => form.id === formId);
    const isThereSelectedAnswerId = changedForms?.answers.includes(dataId);
    if (type === "1") {
      //checkbox
      if (changedForms && isThereSelectedAnswerId) {
        changedForms.answers = changedForms.answers.filter(
          (answer) => answer !== dataId
        );
        return;
      }

      if (changedForms && !isThereSelectedAnswerId) {
        changedForms.answers.push(dataId);
      }
      // return;
    }

    if (type === "2") {
      //radio
      console.log(dataId);
      if (changedForms) changedForms.answers = [dataId];
    }

    if (type === "3") {
      // subjective
      if (changedForms) changedForms.answers[0] = value;
    }

    setAnswer(newForms);
  };
  return { onChangeDataFn, answer };
};

export { useUserForm as default, usePostResponse };
