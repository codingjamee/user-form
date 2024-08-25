import { useState, FormEvent } from "react";
import '../../../App.css'
import FormTitle from "./FormTitle.tsx";
import FormAdd from "./FormAdd.tsx";
import { createDefaultFormObj } from "../../../util/utils.ts";
import { FormPageData } from "../../../types/type.ts";
import FormItem from "./FormItem.tsx";
import cloneDeep from "lodash.clonedeep";
import { useNavigate } from "react-router-dom";
import useAdminQueries from "../../../hooks/useAdminQueries.ts";

function AdminForms() {
  const copiedObj = createDefaultFormObj();
  const [optionGroup, setOptionGroup] = useState<FormPageData>(copiedObj);
  const navigate = useNavigate();

  const onClickSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { postFormApi } = useAdminQueries();
    try {
      const result = await postFormApi({
        body: optionGroup,
      });
      const response = await result.json();
      const responseId = response?.formId.split("_")[1];
      navigate(`/user/forms/${responseId}`);
    } catch (err) {
      console.log(err);
    }
  };

  const onClickAdd = () => {
    const copiedForms = createDefaultFormObj().forms[0];
    setOptionGroup((prev) => {
      const clonedPrev = cloneDeep(prev);
      clonedPrev.forms.push(copiedForms);
      return clonedPrev;
    });
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

export default AdminForms;
