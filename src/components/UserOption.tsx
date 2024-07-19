import { useState } from "react";
import Option from "./Option";
import OptionTitle from "./OptionTitle";
import { combineKey, getClassName } from "../util/utils";
import { UserOptionProps } from "../types/type";

const UserOption = ({ onChangeGroup, optionKey }: UserOptionProps) => {
  const [userOption, setUserOption] = useState({
    type: "1",
    title: "",
    options: { userOption1: "" },
    required: false,
  });

  const onClickDelete = (index: number) => {
    // setUserOption((prev) => {
    //  return prev.filter((option, optionIndex) => index !== optionIndex);
    // });
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <article
        className="user-section"
        onBlur={() => onChangeGroup({ groupKey: optionKey, value: userOption })}
      >
        <OptionTitle setUserOption={setUserOption} />

        {Object.entries(userOption.options).map((_, index) => (
          <Option
            optionClass={getClassName(userOption.type)}
            index={index}
            setUserOption={setUserOption}
            onClickDelete={onClickDelete}
          />
        ))}
        <section
          className="add"
          onClick={() =>
            setUserOption((prev) => ({
              ...prev,
              options: {
                ...prev.options,
                [`userOption${Object.entries(prev.options).length + 1}`]: "",
              },
            }))
          }
        >
          <div className={getClassName(userOption.type)}>
            {getClassName(userOption.type) === "number" &&
              Object.entries(userOption.options).length + 1}
          </div>
          <div className="txt">옵션 추가</div>
          <div></div>
        </section>

        <section style={{ fontSize: "14px", color: "gray" }}>
          Is Required?
          <input
            type="checkbox"
            onChange={(e) =>
              setUserOption((prev) => ({ ...prev, required: e.target.checked }))
            }
          />
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
      >
        휴지통
      </div>
    </div>
  );
};

export default UserOption;
