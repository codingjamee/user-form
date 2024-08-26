import AdminFormsList from "./components/admin/edit/AdminFormsList";
import AdminLayout from "./components/layout/AdminLayout";
import Layout from "./components/layout/Layout";
import UserForms from "./components/user/UserForms";
import AdminForms from "./components/admin/edit/AdminForms";
import AdminResponses from "./components/admin/response/AdminResponses";
import { ROUTE_PATH } from "./util/constants";

export interface RoutesProps {
  name: string;
  path?: string;
  element: () => JSX.Element;
  children?: RoutesProps[];
}

//TODO: path constant로 관리해보기
//TODO: 컴포넌트명 읽기 쉽게 수정해보기

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
            element: AdminFormsList,
            path: ROUTE_PATH.Admin.Forms,
          },
          {
            name: "adminForms",
            element: AdminForms,
            path: ROUTE_PATH.User.FormsEdit,
          },
          {
            name: "adminFormResult",
            element: AdminResponses,
            path: ROUTE_PATH.Admin.FormsResult,
          },
        ],
      },
      {
        name: "userForms",
        path: ROUTE_PATH.User.Forms,
        element: UserForms,
      },
      {
        name: "userFormsDetail",
        path: ROUTE_PATH.User.FormsDetail,
        element: UserForms,
      },
    ],
  },
];
