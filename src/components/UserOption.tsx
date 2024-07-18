import { useState } from "react";
import { onChangeGroupPropType } from "../App";
import Option from "./Option";import OptionTitle from "./OptionTitle";

const getClassName = (type: string) => {
  switch (type) {
    case "1":
      return "circle";
    case "2":
      return "square";
    case "3":
      return "number";
  }
};

interface UserOptionProps {
  onChangeGroup: ({ groupKey, value }: onChangeGroupPropType) => void;
  optionKey: string;
}

const UserOption = ({ onChangeGroup, optionKey }: UserOptionProps) => {
  const [userOption, setUserOption] = useState({
    type: "1",
    title: "",
    options: {},
    required: false,
  });
  const [type, setType] = useState("1");
  const optionArr = [<Option optionClass={getClassName(type)} />];
  const onChangeType = (e) => {
    setType(e.target.value);
  };

  const onClickDelete = () => {
    console.log("delete ");
  };

  return (
    <article
      className="user-section"
      onBlur={() =>
        onChangeGroup({ groupKey: `option${optionKey}`, value: userOption })
      }
    >
      <OptionTitle setUserOption={setUserOption} />

      {optionArr}
      <section
        className="add"
        onClick={() =>
          optionArr.push(<Option optionClass={getClassName(type)} />)
        }
      >
        <div className={getClassName(type)}></div>
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
  );
};

export default UserOption;
