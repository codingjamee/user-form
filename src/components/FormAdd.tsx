import { FormAddProps } from "../types/type";

const FormAdd = ({ setUserOptions }: FormAddProps) => {
  return (
    <div
      className="addInput"
      onClick={() => {
        setUserOptions((prev) => [...prev, `option`]);
      }}
    >
      +
    </div>
  );
};

export default FormAdd;
