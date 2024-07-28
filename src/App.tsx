import { Route, Routes } from "react-router-dom";
import Forms from "./components/admin/Forms.tsx";
import UserForms from "./components/user/UserForms.tsx";
import Layout from "./components/layout/Layout.tsx";
import AdminLayout from "./components/layout/AdminLayout.tsx";
import NewFormBtn from "./components/admin/NewFormBtn.tsx";
import Responses from "./components/admin/Responses.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route element={<Layout />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/forms/" element={<NewFormBtn />} />
          <Route path="/admin/forms/:formId/edit" element={<Forms />} />
          <Route
            path="/admin/forms/:formId/responses"
            element={<Responses />}
          />
        </Route>
        <Route path="/user/forms" element={<UserForms />} />
        <Route path="/user/forms/:formId" element={<UserForms />} />
      </Route>
    </Routes>
  );
}

export default App;
