import { ChangeEvent, MouseEvent, useCallback, useState } from "react";
import Option from "./Option";
import OptionTitle from "./OptionTitle";
import { createDefaultFormObj, getClassName } from "../../util/utils";
import { FormsData, UserOptionProps } from "../../types/type";
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

  const onClickDelete = () => {
    setOptionGroup((prev) => {
      const filteredForms = cloneDeep(prev.forms).filter(
        (form) => form.id !== userOption.id
      );
      return { ...cloneDeep(prev), forms: filteredForms };
    });
  };

  const onBlurFn = () => {
    setOptionGroup((prev) => {
      const updatedForms = cloneDeep(prev.forms);
      updatedForms[index] = option;
      return { ...cloneDeep(prev), forms: updatedForms };
    });
  };

  const onClickAdd = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      setOption((prev) => {
        const copiedOption = cloneDeep(prev);
        const newAsk = createDefaultFormObj().forms[0].asks[0];
        return { ...copiedOption, asks: [...copiedOption.asks, newAsk] };
      });
    },
    [setOptionGroup, index]
  );

  const onChangeCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setOption((prev) => ({ ...cloneDeep(prev), required: e.target.checked }));
  };
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <article className="user-section" onBlur={onBlurFn}>
        <OptionTitle setOption={setOption} onBlurFn={onBlurFn} />

        {userOption.asks.map((option, index) => (
          <Option
            key={`user-${option.id}`}
            optionClass={getClassName(userOption.type)}
            index={index}
            option={option}
            setOption={setOption}
            onBlurGroupFn={onBlurFn}
          />
        ))}
        <section className="add">
          <div className={getClassName(userOption.type)}>
            {getClassName(userOption.type) === "number" &&
              userOption.asks.length + 1}
          </div>
          <div className="txt" onClick={onClickAdd}>
            옵션 추가
          </div>
          <div></div>
        </section>

        <section style={{ fontSize: "14px", color: "gray" }}>
          Is Required?
          <input type="checkbox" onChange={onChangeCheck} />
        </section>
      </article>
      <div
        style={{
          width: "100px",
          height: "100px",
          borderRadius: "8px",
          border: "1px solid rgb(218, 220, 224)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={onClickDelete}
      >
        휴지통
      </div>
    </div>
  );
};

export default FormItem;
