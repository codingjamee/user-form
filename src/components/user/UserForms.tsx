import { useEffect, useEffect, useState } from "react";
import GetForm from "./GetForm";
import { useParams } from "react-router-dom";
import { useParams } from "react-router-dom";

const UserForms = () => {
  const [data, setData] = useState();
  const { formId } = useParams();

  const getFormData = async () => {
    const result = await fetch(`/api/forms/${formId}`, {
      method: "GET",
    });
    const resultText = await result.json();
    setData(resultText);
  };

  useEffect(() => {
    getFormData();
  }, []);

  return (
    <>
      <div
        onClick={async () => {
          const result = await fetch(`/api/forms/${formId}`, {
            method: "GET",
          });
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

      <GetForm data={data} />
    </>
  );
  const { formId } = useParams();

  const getFormData = async () => {
    try {
      const result = await fetch(`/api/forms/${formId}`, {
        method: "GET",
      });
      const resultText = await result.json();
      setData(resultText);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFormData();
  }, []);

  return <GetForm data={data} />;
};

export default UserForms;
