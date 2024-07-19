import { useState } from "react";
import "./App.css";
import UserOption from "./components/UserOption.tsx";
import FormTitle from "./components/FormTitle.tsx";
import FormAdd from "./components/FormAdd.tsx";
import { combineKey, getNextNumber } from "./util/utils.ts";
import { onChangeGroupPropType } from "./types/type.ts";
import GetForm from "./components/GetForm.tsx";

function App() {
  const [optionGroup, setOptionGroup] = useState({
    formTitle: { title: "", desc: "" },
  });
  const [data, setData] = useState();

  const onClickSubmit = async (e) => {
    e.preventDefault();
    console.log(optionGroup);
    const result = await fetch("/api", {
      method: "POST",
      body: JSON.stringify(optionGroup),
    });
    const response = await result.json();
    console.log(response);
  };

  const onChangeGroup = ({ groupKey, value }: onChangeGroupPropType) => {
    setOptionGroup((prev) => ({
      ...prev,
      [groupKey]: value,
    }));
  };

  const [userOptions, setUserOptions] = useState<string[]>(["option"]);

  return (
    <div className="app">
      <form className="form" onSubmit={onClickSubmit}>
        <FormTitle setOptionGroup={setOptionGroup} />

        {userOptions.map((userOption, index) => (
          <UserOption
            key={`group-${index}`}
            onChangeGroup={onChangeGroup}
            optionKey={combineKey({
              key_one: userOption,
              key_two: getNextNumber({ prevNumber: index })?.toString(),
            })}
            setOptionGroup={setOptionGroup}
          />
        ))}

        <FormAdd setUserOptions={setUserOptions} />
        <button type="submit">제출</button>
      </form>
      <div
        onClick={async () => {
          const result = await fetch("/resource", { method: "GET" });
          const resultText = await result.json();
          console.log(resultText);
          setData(resultText);
        }}
        style={{ width: "100px", height: "100px", border: "1px solid gray" }}
      >
        데이터 가져오기
      </div>

      <GetForm data={data?.data} />
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
