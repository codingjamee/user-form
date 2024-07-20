import { FormAddProps } from "../types/type";
import { ulid } from "ulid";

const FormAdd = ({ setOptionGroup }: FormAddProps) => {
  return (
    <div
      className="addInput"
      onClick={() => {
        setOptionGroup((prev) => ({
          ...prev,
          forms: [
            ...prev.forms,
            {
              id: ulid(),
              title: "",
              asks: [
                {
                  id: ulid(),
                  title: "",
                  options: [{ id: ulid(), contents: "" }],
                },
              ],
              required: false,
              type: "",
            },
          ],
        }));
      }}
    >
      +
    </div>
  );
};

export default FormAdd;
