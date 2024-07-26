import { useState } from "react";
import { AsksData, OptionProps } from "../../types/type";
import { getNextNumber } from "../../util/utils";
import cloneDeep from "lodash.clonedeep";

const Option = ({
  optionClass,
  index,
  option,
  setOption,
  onBlurGroupFn,
}: OptionProps) => {
  const [optionDesc, setOptionDesc] = useState<AsksData>(cloneDeep(option));
  const onBlurFn = () => {
    setOption((prev) => {
      const updatedOptions = cloneDeep(prev.asks);
      updatedOptions[index] = optionDesc;

      return {
        ...cloneDeep(prev),
        asks: updatedOptions,
      };
    });
    onBlurGroupFn();
  };

  const onDeleteFn = () => {
    setOption((prev) => {
      const updatedOptions = cloneDeep(prev.asks).filter(
        (opt) => opt.id !== option.id
      );
      return { ...cloneDeep(prev), asks: updatedOptions };
    });
    onBlurGroupFn();
  };

  return (
    <section className="options" onBlur={onBlurFn}>
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
      <div onClick={onDeleteFn}>x</div>
    </section>
  );
};

export default Option;
