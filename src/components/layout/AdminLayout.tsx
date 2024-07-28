import { Outlet, useNavigate, useParams } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { formId } = useParams();
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
          onClick={() => navigate(`/admin/forms/${formId}/edit`)}
        >
          질문
        </button>
        <button
          className="btn"
          style={{ flex: 1 }}
          onClick={() => navigate(`/admin/forms/${formId}/responses`)}
        >
          응답
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default AdminLayout;
