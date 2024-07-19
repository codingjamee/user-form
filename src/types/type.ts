export interface UserOptionProps {
  onChangeGroup: ({ groupKey, value }: onChangeGroupPropType) => void;
  optionKey: string;
  setOptionGroup: React.Dispatch<
    React.SetStateAction<{
      formTitle: {
        title: string;
        desc: string;
      };
    }>
  >;
}

export interface onChangeGroupPropType {
  groupKey: string;
  value: {};
}

export interface FormAddProps {
  setUserOptions: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface FormTitleProps {
  setOptionGroup: React.Dispatch<
    React.SetStateAction<{
      formTitle: {
        title: string;
        desc: string;
      };
    }>
  >;
}

export interface OptionProps {
  optionClass?: string;
  setUserOption: React.Dispatch<
    React.SetStateAction<{
      type: string;
      title: string;
      options: {
        userOption1: string;
      };
      required: boolean;
    }>
  >;
  index: number;
  onClickDelete: (index: number) => void;
}

export interface OptionTitleProps {
  setUserOption: React.Dispatch<
    React.SetStateAction<{
      type: string;
      title: string;
      options: {
        userOption1: string;
      };
      required: boolean;
    }>
  >;
}
