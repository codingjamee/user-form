export interface FormTitle {
  title: string;
  desc: string;
}

export interface OptionsData {
  id: string;
  contents: string;
}
export interface AsksData {
  id: string;
  title: string;
  options: OptionsData[];
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

export interface UserOptionProps {
  userOption: FormsData;
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
  setOption: React.Dispatch<React.SetStateAction<FormsData>>;
  index: number;
  onClickDelete: (id: string) => void;
  option: AsksData;
}

export interface OptionTitleProps {
  setOption: React.Dispatch<React.SetStateAction<FormsData>>;
}
