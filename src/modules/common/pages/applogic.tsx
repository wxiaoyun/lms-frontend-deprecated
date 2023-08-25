import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import { RootState } from "../../../store";
import * as Constants from "../../../config/constants";
import { baseApi, userApi } from "../../../api";

export const AppLogic: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const app = useSelector((state: RootState) => state.app);

	// Check backend status
	React.useEffect(() => {
		if (app.backendStatus !== Constants.BACKEND_STATUS_UNKNOWN) return;
		baseApi.GetHealth();
		//eslint-disable-next-line
	}, []);

	// Check user login status using session cookie. Updates the redux store if user is logged in.
	React.useEffect(() => {
		// prevent repeated api calls
		if (!app.isLoggedIn && app.backendStatus !== Constants.BACKEND_STATUS_DOWN)
			userApi.GetCurrentUser(dispatch, navigate);
		//eslint-disable-next-line
	}, [app.backendStatus, app.isLoggedIn]);

	return <Outlet />;
};

export default AppLogic;
