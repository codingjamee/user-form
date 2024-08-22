import { FormAddProps } from "../../types/type";

const FormAdd = ({ onClickAdd }: FormAddProps) => {
  return (
    <div className="addInput" onClick={() => onClickAdd()}>
      +
    </div>
  );
};

export default FormAdd;
