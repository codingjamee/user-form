import { useNavigate } from "react-router-dom";
import { ulid } from "ulid";
import useAdminForm from "./hooks/useAdminForm";

const NewFormBtn = () => {
  const navigate = useNavigate();
  const formId = ulid();
  const { lists } = useAdminForm();

  return (
    <>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {lists &&
          lists?.map((list) => (
            <li
              onClick={() => navigate(`/admin/forms/${list.key}/responses`)}
              style={{
                border: "1px solid rgb(218, 220, 224)",
                borderRadius: "4px",
                padding: "10px",
                width: "50%",
                cursor: "pointer",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ fontSize: "20px" }}>제목 : {list.title.title}</div>
              <div>({list.title.desc})</div>
            </li>
          ))}
      </ul>
      <button
        className="btn"
        onClick={() => navigate(`${formId}/edit`)}
        style={{ maxWidth: "900px" }}
      >
        폼 생성하기
      </button>
    </>
  );
};

export default NewFormBtn;

/**
 * 질문 id들 보여주기
 *
 */
