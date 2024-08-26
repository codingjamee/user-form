import { useNavigate } from "react-router-dom";
import { ulid } from "ulid";
import useAdminForm from "../hooks/useAdminForm";
import styles from "./adminFormsList.module.css";
import copyClipboard from "../../../hooks/copyClipboard";

const AdminFormsList = () => {
  const navigate = useNavigate();
  const formId = ulid();
  const { lists } = useAdminForm();

  const onCopyClick = ({ key }: { key: string }) => {
    copyClipboard({ urlToCopy: `/user/forms/${key}` });
  };
  if (lists.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ul className={styles.wrapper}>
        {lists.map((list) => (
          <div className={styles["flex-wrapper"]} key={list.key}>
            <li
              onClick={() => navigate(`/admin/forms/${list.key}/result`)}
              className={styles.list}
            >
              <div style={{ fontSize: "20px" }}>제목 : {list.title.title}</div>
              <div>({list.title.desc})</div>
            </li>
            <div
              className={styles.clip}
              onClick={() => onCopyClick({ key: list.key })}
            >
              유저 url 복사
            </div>
            <div
              className={styles.clip}
              onClick={() => navigate(`/user/forms/${list.key}`)}
            >
              유저 페이지 이동
            </div>
          </div>
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

export default AdminFormsList;

/**
 * 질문 id들 보여주기
 *
 */
