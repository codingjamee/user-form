import { useEffect, useState } from "react";
import { FormPageData, FormsAnswerData } from "../../../types/type";
import useUserQueries from "../../../hooks/useUserQueries";
import { ulid } from "ulid";

const useUserForm = ({ formId }: { formId?: string }) => {
  const [data, setData] = useState<FormPageData>();
  const { getFormApi } = useUserQueries();

  const getFormData = async () => {
    try {
      const result = await getFormApi(formId ? { formId: formId } : {});
      const resultText = await result.json();
      setData(resultText);
    } catch (err) {
      alert("에러 발생");
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
          answerId: ulid(),
          answers: [],
          required: form.required ? form.required : false,
        }))
      );
  }, [data]);

  const onChangeDataFn = ({
    type,
    value,
    dataId,
    formId,
  }: {
    type: "checkbox" | "radio" | "text";
    value: string;
    dataId: string;
    formId: string;
  }) => {
    const newForms: FormsAnswerData[] = answer ? [...answer] : [];
    const changedForms = newForms.find((form) => form.id === formId);
    const isThereSelectedAnswerId = changedForms?.answers.includes(dataId);
    if (type === "checkbox") {
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

    if (type === "radio") {
      //radio
      if (changedForms) changedForms.answers = [dataId];
    }

    if (type === "text") {
      // subjective
      if (changedForms) changedForms.answers[0] = value;
    }

    setAnswer(newForms);
  };
  return { onChangeDataFn, answer };
};

export { useUserForm as default, usePostResponse };
