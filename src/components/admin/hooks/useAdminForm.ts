import { useEffect, useState } from "react";
import useAdminQueries from "../../../hooks/useAdminQueries";
import { FormsLists } from "../../../types/type";

const useAdminForm = () => {
  const [lists, setLists] = useState<FormsLists[]>();
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
