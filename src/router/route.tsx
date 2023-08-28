import { createBrowserRouter } from "react-router-dom";

import { App, PageNotFound, SignInPage, SignUpPage } from "../modules";
import { AuthRoutes } from ".";

export const Router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    Component: App,
    children: [
      {
        id: "auth",
        path: `/${AuthRoutes.BASE}`,
        children: [
          {
            id: "signin",
            path: `/${AuthRoutes.BASE}/${AuthRoutes.SIGN_IN.ROUTE}`,
            Component: SignInPage,
          },
          {
            id: "signup",
            path: `/${AuthRoutes.BASE}/${AuthRoutes.SIGN_UP.ROUTE}`,
            Component: SignUpPage,
          },
        ],
      },
    ],
  },
  {
    id: "pagenotfound",
    path: "*",
    Component: PageNotFound,
  },
]);

export default Router;
