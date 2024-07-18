import { useState } from "react";

const Option = ({ optionClass, optionNum, onClickDelete }) => {
  const [optionDesc, setOptionDesc] = useState("");

  return (
    <section className="options">
      <div className={optionClass}>{optionNum}</div>
      <input
        type="text"
        placeholder="옵션 1"
        onChange={(e) => setOptionDesc(e.target.value)}
      />
      <div onClick={onClickDelete}>x</div>
    </section>
  );
};

export default Option;
