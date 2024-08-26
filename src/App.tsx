import { Route, Routes } from "react-router-dom";

import { routes, RoutesProps } from "./routes.ts";

function App() {
  const returnRoutes = (returnRoute: RoutesProps[]) => {
    return returnRoute.map((route) => {
      if (!route.children)
        return <Route path={route.path} element={<route.element />} />;
      if (route.children)
        return (
          <Route path={route.path} element={<route.element />}>
            {returnRoutes(route.children)}
          </Route>
        );
    });
  };
  return <Routes>{returnRoutes(routes)}</Routes>;
}

export default App;
