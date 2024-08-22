const ROUTE_PATH = {
  User: {
    Forms: "/user/forms/:formId",
  },
  Admin: {
    Forms: "/admin/forms/:formId",
  },
};

export const getRoutePath = {
  userForms: (formId: string) =>
    ROUTE_PATH.User.Forms.replace(":formId", formId),
  adminForms: (formId: string) =>
    ROUTE_PATH.Admin.Forms.replace(":formId", formId),
};
