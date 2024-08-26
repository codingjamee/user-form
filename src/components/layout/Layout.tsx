import { Outlet, useNavigate } from "react-router-dom";
import styles from "./layout.module.css";
import { ROUTE_PATH } from "../../util/constants";
const Layout = () => {
  const navigate = useNavigate();
  return (
    <div className={`${styles["layout-wrapper"]}`}>
      <div className={`${styles["layout"]}`}>
        <button
          className="btn"
          style={{ flex: 1 }}
          onClick={() => navigate(ROUTE_PATH.Admin.Forms)}
        >
          admin form
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
