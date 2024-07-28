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
  type: string;
  title: string;
  asks: AsksData[];
  required: boolean;
}

export interface FormPageData {
  formTitle: FormTitle;
  forms: FormsData[];
}

export interface FormAnswer {
  questionId?: string;
  responses: Responses;
}

export interface Responses {
  responseCount: number;
  responsesField: Response[][];
}

export interface Response {
  title: string;
  checkedId: string | string[];
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
  onBlurGroupFn: ({ newOption }: { newOption: FormsData }) => void;
  index: number;
  option: AsksData;
}

export interface OptionTitleProps {
  option: FormsData;
  setOption: React.Dispatch<React.SetStateAction<FormsData>>;
  onBlurFn: ({ newOption }: { newOption: FormsData }) => void;
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
  body?: FormPageData | FormAnswer;
  config?: any;
}

export interface Params {
  [key: string]: string;
}

export interface postResponseApiProps {
  body?: FormAnswer;
  config?: ResponseInit;
}
