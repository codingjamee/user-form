import { useState } from "react";
import "./App.css";
import UserOption from "./components/UserOption.tsx";

function App() {
  const [optionNum, setOptionNum] = useState(1);

  const onClickNext = (e) => {
    // e.preventDefault();
    // setValue((prev) => {
    //   console.log(prev);
    //   return prev + 1;
    // });
    // console.log(value);
  };

  const [userOptions, setUserOptions] = useState([<UserOption />]);

  return (
    <div className="app">
      <form className="form" onSubmit={onClickNext}>
        <section className="title-section title">
          <div className="edge"></div>
          <div className="zone">
            <input type="text" placeholder="설문지 제목" />
            <input type="text" className="desc" placeholder="설문지 설명" />
          </div>
        </section>
        {userOptions}
        <div
          className="addInput"
          onClick={() => {
            setUserOptions((prev) => [...prev, <UserOption />]);
          }}
        >
          +
        </div>
        <button type="submit">제출</button>
      </form>
    </div>
  );
}

export default App;

/**
 * type: [0: "radio", 1: "checkbox", 2: "short"]
{
  type: "",
  asks: [
    { title: "", options: ["", "", ""], required: true },
    { title: "", options: ["", "", ""] },
  ],
};
 */
