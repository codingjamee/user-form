import { ChangeEvent, MouseEvent, useCallback, useState } from "react";
import Option from "./Option";
import OptionTitle from "./OptionTitle";
import { combineKey, createDefaultFormObj, getClassName } from "../util/utils";
import { AsksData, FormsData, UserOptionProps } from "../types/type";
import { ulid } from "ulid";
import cloneDeep from "lodash.clonedeep";

const FormItem = ({ userOption, setOptionGroup, index }: UserOptionProps) => {
  const [option, setOption] = useState<FormsData>({
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
    type: "1",
  });

  const onClickDelete = () => {
    setOptionGroup((prev) => {
      const filteredForms = [...prev.forms].filter(
        (form) => form.id !== userOption.id
      );
      return { ...prev, forms: filteredForms };
    });
  };

  // const handleBlur = () => {
  //   setOptionGroup((prev) => {
  //     const updatedForms = [...prev.forms];
  //     updatedForms[index] = option;
  //     return { ...prev, forms: updatedForms };
  //   });
  // };

  const onClickAdd = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      console.log("Add button clicked");

      setOptionGroup((prev) => {
        const copiedForms = [...prev.forms];
        const newAsk = cloneDeep(createDefaultFormObj().forms[0].asks[0]);
        copiedForms[index].asks = [...copiedForms[index].asks, newAsk];
        return { ...prev, forms: copiedForms };
      });
    },
    [setOptionGroup, index]
  );

  const onChangeCheck = (e: ChangeEvent<HTMLInputElement>) => {
    setOption((prev) => ({ ...prev, required: e.target.checked }));
  };
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <article
        className="user-section"
        // onBlur={handleBlur}
      >
        <OptionTitle setOption={setOption} />

        {userOption.asks.map((option, index) => (
          <Option
            key={`user-${index}`}
            optionClass={getClassName(userOption.type)}
            index={index}
            option={option}
            setOption={setOption}
            onClickDelete={() => {}}
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
