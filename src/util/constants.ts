export const ROUTE_PATH = {
  User: {
    FormsDetail: "/user/forms/:formId",
    FormsEdit: "/user/forms/:formId/edit",
    Forms: "/user/forms",
  },
  Admin: {
    FormsResult: "/admin/forms/:formId/result",
    Forms: "/admin/forms",
  },
};

export const getRoutePath = {
  userForms: (formId: string) =>
    ROUTE_PATH.User.FormsEdit.replace(":formId", formId),
  userResponses: (formId: string) =>
    ROUTE_PATH.User.FormsDetail.replace(":formId", formId),
  adminForms: (formId: string) =>
    ROUTE_PATH.Admin.FormsResult.replace(":formId", formId),
};
