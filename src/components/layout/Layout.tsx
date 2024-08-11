import { Outlet, useNavigate } from "react-router-dom";

const Layout = () => {
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div
        style={{
          width: "640px",
          display: "flex",
          flex: 1,
          height: "20px",
          gap: "10px",
        }}
      >
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
