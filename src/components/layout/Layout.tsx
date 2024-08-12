import { Outlet, useNavigate } from "react-router-dom";
import styles from "./layout.module.css";
const Layout = () => {
  const navigate = useNavigate();
  return (
    <div className={`${styles["layout-wrapper"]}`}>
      <div className={`${styles["layout"]}`}>
        <button
          className="btn"
          style={{ flex: 1 }}
          onClick={() => navigate("/admin/forms")}
        >
          admin form
        </button>
        <button
          className="btn"
          style={{ flex: 1 }}
          onClick={() => navigate("/user/forms")}
        >
          user form
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
