import { createBrowserRouter } from "react-router-dom";

import { AppLogic, PageNotFound, SignInPage, SignUpPage } from "../modules";

export const Router = createBrowserRouter([
	{
		id: "root",
		path: "/",
		Component: AppLogic,
		children: [
			{
				id: "auth",
				path: "/auth",
				children: [
					{
						id: "signin",
						path: "/auth/signin",
						Component: SignInPage,
					},
					{
						id: "signup",
						path: "/auth/signup",
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
