import { useState } from "react";
import { OptionProps } from "../types/type";
import { getNextNumber } from "../util/utils";

const Option = ({
  optionClass,
  setUserOption,
  index,
  onClickDelete,
}: OptionProps) => {
  const [optionDesc, setOptionDesc] = useState("");

  return (
    <section
      className="options"
      onBlur={() =>
        setUserOption((prev) => ({
          ...prev,
          options: { ...prev.options, [`userOption${index + 1}`]: optionDesc },
        }))
      }
    >
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
