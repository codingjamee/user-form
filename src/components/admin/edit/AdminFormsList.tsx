import { useNavigate } from "react-router-dom";
import { ulid } from "ulid";
import useAdminForm from "../hooks/useAdminForm";
import styles from "./adminFormsList.module.css";

const AdminFormsList = () => {
  const navigate = useNavigate();
  const formId = ulid();
  const { lists } = useAdminForm();

  const onCopyClick = ({ key }: { key: string }) => {
    const urlToCopy = `/user/forms/${key}`;
    navigator.clipboard
      .writeText(urlToCopy)
      .then(() => {
        alert("URL이 클립보드에 복사되었습니다!");
      })
      .catch((err) => {
        console.error("복사에 실패했습니다:", err);
      });
  };

  // console.log(lists);

  return (
    <>
      <ul className={styles.wrapper}>
        {lists &&
          lists?.map((list) => (
            <div className={styles["flex-wrapper"]} key={list.key}>
              <li
                onClick={() => navigate(`/admin/forms/${list.key}/result`)}
                className={styles.list}
              >
                <div style={{ fontSize: "20px" }}>
                  제목 : {list.title.title}
                </div>
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
