import { useEffect, useState } from "react";
import "./App.css";
import UserOption from "./components/UserOption.tsx";
import FormTitle from "./components/FormTitle.tsx";
import FormAdd from "./components/FormAdd.tsx";

export interface onChangeGroupPropType {
  groupKey: string;
  value: {};
}

function App() {
  const [optionGroup, setOptionGroup] = useState({
    formTitle: { title: "", desc: "" },
    option1: {
      type: "",
      title: "",
      options: ["option1"],
      required: true,
    },
  });

  const onClickSubmit = () => {
    console.log(optionGroup);
  };

  /**
   * 
   * @param option1 
   * option1: {
    type: "",
    title : [],
    asks: [
      { title: "", options: ["", "", ""], required: true },
      { title: "", options: ["", "", ""] },
    ],
  }, 
   */

  const onChangeGroup = ({ groupKey, value }: onChangeGroupPropType) => {
    setOptionGroup((prev) => ({
      ...prev,
      [groupKey]: value,
    }));
  };

  const [userOptions, setUserOptions] = useState<string[]>(["option"]);
  useEffect(() => {
    console.log(optionGroup);
  }, [optionGroup]);

  return (
    <div className="app">
      <form className="form" onSubmit={onClickSubmit}>
        <FormTitle setOptionGroup={setOptionGroup} />

        {userOptions.map((userOption) => (
          <UserOption onChangeGroup={onChangeGroup} optionKey={userOption} />
        ))}
        <FormAdd setUserOptions={setUserOptions} />

        <button type="submit">제출</button>
      </form>
    </div>
  );
}

export default App;

/**
 * type: [0: "radio", 1: "checkbox", 2: "short"]
{
  formTitle: { title: "", desc: "" },
  option1: {
    type: "",
    title : [],
    asks: [
      { title: "", options: ["", "", ""], required: true },
      { title: "", options: ["", "", ""] },
    ],
  }, 
  option2: {
    type: "",
    title : [],
    asks: [
      { title: "", options: ["", "", ""], required: true },
      { title: "", options: ["", "", ""] },
    ],
  }
};
 */
