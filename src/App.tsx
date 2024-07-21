import { useEffect, useState, FormEvent } from "react";
import "./App.css";
import FormTitle from "./components/FormTitle.tsx";
import FormAdd from "./components/FormAdd.tsx";
import {
  combineKey,
  createDefaultFormObj,
  getNextNumber,
} from "./util/utils.ts";
import { FormPageData, onChangeGroupPropType } from "./types/type.ts";
import GetForm from "./components/GetForm.tsx";
import FormItem from "./components/FormItem.tsx";
import cloneDeep from "lodash.clonedeep";

function App() {
  const copiedObj = cloneDeep(createDefaultFormObj());
  const [optionGroup, setOptionGroup] = useState<FormPageData>(copiedObj);
  const [data, setData] = useState();

  const onClickSubmit = async (e: FormEvent<HTMLFormElement>) => {
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
      ...cloneDeep(prev),
      [groupKey]: value,
    }));
  };

  const onClickAdd = () => {
    const copiedForms = cloneDeep(createDefaultFormObj().forms[0]);
    setOptionGroup((prev) => ({
      ...cloneDeep(prev),
      forms: [...prev.forms, copiedForms],
    }));
  };

  useEffect(() => {
    console.log(optionGroup);
  }, [optionGroup]);

  return (
    <div className="app">
      <form className="form" onSubmit={onClickSubmit}>
        <FormTitle setOptionGroup={setOptionGroup} />

        {optionGroup.forms.map((userOption, index) => (
          <FormItem
            key={`group-${userOption.id}`}
            optionGroup={optionGroup}
            setOptionGroup={setOptionGroup}
            userOption={userOption}
            index={index}
          />
        ))}

        <FormAdd onClickAdd={onClickAdd} />
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

// type: [0: "radio", 1: "checkbox", 2: "short"]
/**
 const df: FormPageData = {
  formTitle: { title: "", desc: "" },
  forms: [
    {
      id: ulid(),
      type: "",
      title: "",
      required: true,
      asks: [
        {
          id: ulid(),
          title: "",
        },
        {
          id: ulid(),
          title: "",
        },
      ],
    },
  ],
};

 * 
 */
