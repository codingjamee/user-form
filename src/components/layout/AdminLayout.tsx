import { Outlet, useNavigate, useParams } from "react-router-dom";
import styles from "./layout.module.css";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { formId } = useParams();
  return (
    <div className={`${styles["admin-wrapper"]}`}>
      <div className={styles.admin}>
        <button
          className="btn"
          style={{ flex: 1 }}
          onClick={() => navigate(`/admin/forms/${formId}/responses`)}
        >
          요약
        </button>
        <button
          className="btn"
          style={{ flex: 1 }}
          onClick={() => navigate(`/admin/forms/${formId}/edit`)}
        >
          질문
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
