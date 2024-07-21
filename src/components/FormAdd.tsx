import { FormAddProps } from "../types/type";
import { ulid } from "ulid";

const FormAdd = ({ onClickAdd }: FormAddProps) => {
  return (
    <div className="addInput" onClick={() => onClickAdd()}>
      +
    </div>
  );
};

export default FormAdd;
