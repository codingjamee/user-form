import { FormAnswers, FormPageData, FormsAnswerData } from "../types/type";
import { ulid } from "ulid";

export const getNextNumber = ({ prevNumber }: { prevNumber: number }) => {
  if (typeof prevNumber !== "number")
    return console.log("숫자만 사용할 수 있습니다.");
  return prevNumber + 1;
};

export const combineKey = ({
  key_one,
  key_two,
}: {
  key_one: string;
  key_two?: string;
}) => {
  return `${key_one}${key_two}`;
};

export const getClassName = (type: string) => {
  switch (type) {
    case "1":
      return "circle";
    case "2":
      return "square";
    case "3":
      return "number";
  }
};

export const createDefaultFormObj = (): FormPageData => {
  return {
    formTitle: { title: "", desc: "" },
    forms: [
      {
        id: ulid(),
        title: "",
        required: false,
        type: "1",
        asks: [
          {
            id: ulid(),
            title: "",
          },
        ],
      },
    ],
  };
};

export const createDefaultUserFormObj = (): FormAnswers => {
  return {
    responseId: ulid(),
    forms: [
      {
        id: ulid(),
        responses: [
          {
            questionId: ulid(),
            answer: [""],
          },
        ],
      },
    ],
  };
};

//삭제예정

export const getInputType = ({ type }: { type: string }) => {
  if (type === "1") {
    return "checkbox";
  }
  if (type === "2") {
    return "radio";
  }
  if (type === "3") {
    return "text";
  }
};

export const checkRequired = (forms: FormsAnswerData[]) => {
  return forms
    .map((form) => {
      if (form.required && (!form.answers || form.answers.length < 1)) {
        return false;
      }
      return true;
    })
    .every((value) => value === true);
};
