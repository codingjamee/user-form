import { useState } from "react";
import { AsksData, OptionProps, OptionsData } from "../types/type";
import { getNextNumber } from "../util/utils";
import { ulid } from "ulid";

const Option = ({
  optionClass,
  index,
  option,
  setOption,
  onClickDelete,
}: OptionProps) => {
  const [optionDesc, setOptionDesc] = useState<AsksData>({
    id: ulid(),
    title: "",
    options: [{ id: ulid(), contents: "" }],
  });
  const handleBlur = () => {
    setOption((prev) => {
      const updatedOptions = [...prev.asks];
      updatedOptions[index] = optionDesc;

      return {
        ...prev,
        options: updatedOptions,
      };
    });
  };

  return (
    <section className="options" onBlur={handleBlur}>
      <div className={optionClass}>
        {optionClass === "number"
          ? getNextNumber({ prevNumber: index }) ?? null
          : null}
      </div>
      <input
        type="text"
        placeholder={`옵션 ${index + 1}`}
        onChange={(e) => setOptionDesc(e.target.value)}
      />
      <div onClick={() => onClickDelete(index)}>x</div>
    </section>
  );
};

export default Option;
