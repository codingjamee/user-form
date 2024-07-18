import { getNextNumber } from "../util/utils";

const FormAdd = ({
  setUserOptions,
}: {
  setUserOptions: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  return (
    <div
      className="addInput"
      onClick={() => {
        setUserOptions((prev) => [
          ...prev,
          `option${getNextNumber({ prevNumber: prev.length })}`,
        ]);
      }}
    >
      +
    </div>
  );
};

export default FormAdd;
