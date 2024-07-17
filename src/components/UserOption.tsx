import { useState } from "react";

const UserOption = () => {
  const [type, setType] = useState("1");
  const onChangeType = (e) => {
    setType(e.target.value);
  };

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

  const onClickDelete = () => {
    console.log("delete ");
  };

  return (
    <article className="user-section">
      <div className="box">
        <input className="title" type="text" placeholder="제목" />
        <select name="" id="" onChange={(e) => onChangeType(e)}>
          <option value="1">객관식 질문</option>
          <option value="2">체크박스</option>
          <option value="3">드롭다운</option>
        </select>
      </div>
      <section className="options">
        <div className={getClassName(type)}>{type === "3" && type}</div>
        <input type="text" placeholder="옵션 1" />
        <div onClick={onClickDelete}>x</div>
      </section>
      <section className="add" onClick={() => console.log("추가")}>
        <div className={getClassName(type)}></div>
        <div className="txt">옵션 추가</div>
        <div></div>
      </section>
    </article>
  );
};

export default UserOption;

