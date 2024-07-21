import { useEffect, useState, FormEvent } from "react";
import "../../App.css";
import FormTitle from "../../components/FormTitle.tsx";
import FormAdd from "../../components/FormAdd.tsx";
import {
  combineKey,
  createDefaultFormObj,
  getNextNumber,
} from "../../util/utils.ts";
import { FormPageData, onChangeGroupPropType } from "../../types/type.ts";
import GetForm from "../../components/GetForm.tsx";
import FormItem from "../../components/FormItem.tsx";
import cloneDeep from "lodash.clonedeep";

function Forms() {
  const copiedObj = cloneDeep(createDefaultFormObj());
  const [optionGroup, setOptionGroup] = useState<FormPageData>(copiedObj);

  const onClickSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await fetch("/api", {
      method: "POST",
      body: JSON.stringify(optionGroup),
    });
    const response = await result.json();
    console.log(response);
  };

  const onClickAdd = () => {
    const copiedForms = cloneDeep(createDefaultFormObj().forms[0]);
    setOptionGroup((prev) => ({
      ...cloneDeep(prev),
      forms: [...prev.forms, copiedForms],
    }));
  };

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
        <button type="submit" className="btn submitBtn">
          제출
        </button>
      </form>
    </div>
  );
}

export default Forms;
