import { useState } from "react";
import GetForm from "./GetForm";

const UserForms = () => {
  const [data, setData] = useState();

  return (
    <>
      <div
        onClick={async () => {
          const result = await fetch("/resource", { method: "GET" });
          const resultText = await result.json();
          setData(resultText);
        }}
        className="btn"
        style={{
          width: "640px",
          height: "100px",
          display: "flex",
          flex: 1,
          backgroundColor: "#efefef",
          boxSizing: "border-box",
          justifyContent: "center",
        }}
      >
        데이터 가져오기
      </div>

      <GetForm data={data?.data} />
    </>
  );
};

export default UserForms;
