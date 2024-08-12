import { useEffect, useState } from "react";
import useAdminQueries from "../../../hooks/useAdminQueries";

const useAdminForm = () => {
  const [lists, setLists] = useState();
  const { getFormApi } = useAdminQueries();

  const getAdminForm = async () => {
    try {
      const result = await getFormApi();
      const data = await result.json();
      if (result.ok) {
        return setLists(data);
      }
    } catch (err) {
      alert("에러 발생");
    }
  };

  useEffect(() => {
    getAdminForm();
  }, []);

  return { lists, getAdminForm };
};

export default useAdminForm;
