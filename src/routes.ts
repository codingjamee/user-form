import Forms from "./components/admin/Forms";
import NewFormBtn from "./components/admin/NewFormBtn";
import Responses from "./components/admin/Responses";
import AdminLayout from "./components/layout/AdminLayout";
import Layout from "./components/layout/Layout";
import UserForms from "./components/user/UserForms";

export interface RoutesProps {
  name: string;
  path?: string;
  element: () => JSX.Element;
  children?: RoutesProps[];
}

export const routes: RoutesProps[] = [
  {
    name: "homeLayout",
    path: "/",
    element: Layout,
  },
  {
    name: "commonLayout",
    element: Layout,
    children: [
      {
        name: "adminLayout",
        element: AdminLayout,
        children: [
          {
            name: "newForm",
            element: NewFormBtn,
            path: "/admin/forms",
          },
          {
            name: "adminForms",
            element: Forms,
            path: "/admin/forms/:formId/edit",
          },
          {
            name: "adminFormResult",
            element: Responses,
            path: "/admin/forms/:formId/result",
          },
        ],
      },
      {
        name: "userForms",
        path: "/user/forms",
        element: UserForms,
      },
      {
        name: "userFormsDetail",
        path: "/user/forms/:formId",
        element: UserForms,
      },
    ],
  },
];
