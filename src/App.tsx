import { Route, Routes } from "react-router-dom";
import Forms from "./components/admin/Forms.tsx";
import UserForms from "./components/user/UserForms.tsx";
import Home from "./components/home/Home.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<Home />}>
        <Route path="/admin/forms" element={<Forms />} />
        <Route path="/user/forms" element={<UserForms />} />
        <Route path="/user/forms/:formId" element={<UserForms />} />
      </Route>
    </Routes>
  );
}

export default App;
