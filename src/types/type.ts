export interface FormTitle {
  title: string;
  desc: string;
}

export interface AsksData {
  id: string;
  title: string;
}

export interface FormsData {
  id: string;
  type: "checkbox" | "radio" | "text";
  title: string;
  asks: AsksData[];
  required: boolean;
}

export interface FormsAnswerData {
  id: string;
  answers: string[];
  required: boolean;
}

export interface FormPageData {
  formTitle: FormTitle;
  forms: FormsData[];
}

export interface FormAnswers {
  responseId: string;
  forms: FormResponses[];
}

export interface FormResponses {
  id: string;
  responses: FormAsks[];
}

export interface FormAsks {
  questionId: string;
  answer: string[];
}

/* PROPS */

export interface UserOptionProps {
  userOption: FormsData;
  optionGroup: FormPageData;
  setOptionGroup: React.Dispatch<React.SetStateAction<FormPageData>>;
  index: number;
}

export interface onChangeGroupPropType {
  groupKey: string;
  value: {};
}

export interface FormAddProps {
  onClickAdd: () => void;
}

export interface FormTitleProps {
  setOptionGroup: React.Dispatch<React.SetStateAction<FormPageData>>;
}

export interface OptionProps {
  optionClass?: string;
  userOption: FormsData;
  setOption: React.Dispatch<React.SetStateAction<FormsData>>;
  updateOptionGroup: ({ newOption }: { newOption: FormsData }) => void;
  index: number;
  option: AsksData;
}

export interface OptionTitleProps {
  option: FormsData;
  setOption: React.Dispatch<React.SetStateAction<FormsData>>;
  updateOptionGroup: ({ newOption }: { newOption: FormsData }) => void;
}

export interface AdminPostProps {
  body: FormPageData;
  config?: RequestInit;
}

export interface AdminGetProps {
  formId?: string;
}

export interface AdminApiProps {
  baseURL?: string;
  headers?: HeadersInit;
}

export interface GetProps {
  formId?: string;
}

export interface PostProps {
  url: string;
  body?: FormPageData | FormsAnswerData[];
  config?: any;
}

export interface Params {
  [key: string]: string;
}

interface CustomResponseInit extends ResponseInit {
  formId?: string;
}

export interface postResponseApiProps {
  body?: FormsAnswerData[];
  config?: CustomResponseInit;
}

export interface FormsLists {
  key: string;
  title: TitleInfo;
}

export interface TitleInfo {
  title: string;
  desc: string;
}

export interface Answer {
  id: string;
  name: string;
  count: number;
}

export interface ResponseData {
  id: string;
  title: string;
  answers: Answer[];
}

export interface Data {
  responseCount: number;
  title: string;
  responses: ResponseData[];
}

export interface SummaryResponse {
  data: Data;
}
