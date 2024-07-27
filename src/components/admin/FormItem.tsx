import { ChangeEvent, MouseEvent, useCallback, useState } from "react";
import Option from "./Option";
import OptionTitle from "./OptionTitle";
import { createDefaultFormObj, getClassName } from "../../util/utils";
import { AsksData, FormsData, UserOptionProps } from "../../types/type";
import cloneDeep from "lodash.clonedeep";

const FormItem = ({
  userOption,
  optionGroup,
  setOptionGroup,
  index,
}: UserOptionProps) => {
  const [option, setOption] = useState<FormsData>(
    cloneDeep(optionGroup.forms[index])
  );

  const onBlurFn = ({ newOption }: { newOption: FormsData }) => {
    setOptionGroup((prev) => {
      const updatedForms = cloneDeep(prev.forms);
      updatedForms[index] = newOption;
      return { ...cloneDeep(prev), forms: updatedForms };
    });
  };

  const onClickDelete = () => {
    console.log("delete clicked");
    setOptionGroup((prev) => {
      const filteredForms = cloneDeep(prev.forms).filter(
        (form) => form.id !== userOption.id
      );
      return { ...cloneDeep(prev), forms: filteredForms };
    });
  };

  const onClickAdd = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      const newAsk: AsksData = createDefaultFormObj().forms[0].asks[0];

      const newOption: FormsData = {
        ...option,
        asks: [...option.asks, newAsk],
      };

      setOption(newOption);
      onBlurFn({ newOption });
    },
    [setOption, index, option]
  );

  const onChangeCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setOption((prev) => ({ ...cloneDeep(prev), required: e.target.checked }));
  };
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <article
        className="user-section"
        onBlur={() => onBlurFn({ newOption: option })}
      >
        <OptionTitle
          option={option}
          setOption={setOption}
          onBlurFn={onBlurFn}
        />

        {userOption.asks.map((option, index) => (
          <Option
            key={`user-${option.id}`}
            userOption={userOption}
            optionClass={getClassName(userOption.type)}
            index={index}
            option={option}
            setOption={setOption}
            onBlurGroupFn={onBlurFn}
          />
        ))}
        <section className="add" onClick={onClickAdd}>
          <div className={getClassName(userOption.type)}>
            {getClassName(userOption.type) === "number" &&
              userOption.asks.length + 1}
          </div>
          <div className="txt">옵션 추가</div>
          <div></div>
        </section>

        <section style={{ fontSize: "14px", color: "gray" }}>
          Is Required?
          <input type="checkbox" onChange={onChangeCheck} />
        </section>
      </article>
      <div className="trash" onClick={onClickDelete}>
        휴지통
      </div>
    </div>
  );
};

export default FormItem;
