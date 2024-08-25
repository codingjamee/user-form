import { MouseEvent, useState } from "react";
import { AsksData, OptionProps } from "../../../types/type";
import { getNextNumber } from "../../../util/utils";
import cloneDeep from "lodash.clonedeep";

const Option = ({
  userOption,
  optionClass,
  index,
  option,
  setOption,
  onBlurGroupFn,
}: OptionProps) => {
  const [optionDesc, setOptionDesc] = useState<AsksData>(cloneDeep(option));
  const handleBlur = () => {
    const updatedOptions = cloneDeep(userOption.asks);
    updatedOptions[index] = optionDesc;

    const newOptionGroup = {
      ...userOption,
      asks: updatedOptions,
    };
    setOption(newOptionGroup);
    onBlurGroupFn({ newOption: newOptionGroup });
  };

  const onDeleteFn = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    let clonedOptions = cloneDeep(userOption.asks);
    clonedOptions = clonedOptions.filter((opt) => opt.id !== option.id);

    const updatedOptions = {
      ...userOption,
      asks: clonedOptions,
    };

    setOption(updatedOptions);
    onBlurGroupFn({ newOption: updatedOptions });
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
      <div onClick={onDeleteFn}>x</div>
    </section>
  );
};

export default Option;
