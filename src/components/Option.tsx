import { useState } from "react";
import { AsksData, OptionProps } from "../types/type";
import { getNextNumber } from "../util/utils";
import { ulid } from "ulid";
import cloneDeep from "lodash.clonedeep";

const Option = ({ optionClass, index, option, setOption }: OptionProps) => {
  const [optionDesc, setOptionDesc] = useState<AsksData>(cloneDeep(option));
  console.log(option);
  const handleBlur = () => {
    setOption((prev) => {
      const updatedOptions = cloneDeep(prev.asks);
      updatedOptions[index] = optionDesc;

      return {
        ...cloneDeep(prev),
        asks: updatedOptions,
      };
    });
  };

  const handleDelete = () => {
    setOption((prev) => {
      const updatedOptions = cloneDeep(prev.asks).filter(
        (opt) => opt.id !== option.id
      );
      return { ...cloneDeep(prev), asks: updatedOptions };
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
        onChange={(e) =>
          setOptionDesc((prev) => ({ ...prev, title: e.target.value }))
        }
      />
      <div onClick={handleDelete}>x</div>
    </section>
  );
};

export default Option;
