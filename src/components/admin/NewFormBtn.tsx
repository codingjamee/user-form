import { useNavigate } from "react-router-dom";
import { ulid } from "ulid";

const NewFormBtn = () => {
  const navigate = useNavigate();
  const formId = ulid();

  return (
    <button className="btn" onClick={() => navigate(`${formId}/edit`)}>
      폼 생성하기
    </button>
  );
};

export default NewFormBtn;
