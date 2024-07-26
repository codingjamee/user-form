import { useEffect, useState } from "react";
import GetForm from "./GetForm";
import { useParams } from "react-router-dom";

const UserForms = () => {
  const [data, setData] = useState();
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
