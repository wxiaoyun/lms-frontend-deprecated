import { NavigateFunction } from "react-router-dom";
import { CancelTokenSource } from "axios";

import { BaseApi } from "./base";
import { appSlice } from "../store";
import { NotifyError } from "../util";
import { userSignInSchema } from "../schema";
import { UserRoutes } from "../router";
import { Dispatch } from "react";
import { AnyAction } from "@reduxjs/toolkit";

class UserApi extends BaseApi {
	public GetCurrentUser = (
		dispatch: Dispatch<AnyAction>,
		navigate: NavigateFunction,
		cancelToken?: CancelTokenSource,
	) => {
		const handleSuccess = (data: Payload<LoginPayload>) => {
			if (!userSignInSchema.isValidSync(data.data)) {
				dispatch(appSlice.actions.logout());
				navigate("/auth/signin");
				NotifyError("Invalid user data received from backend");
				return;
			}
			dispatch(appSlice.actions.login(data.data));
			navigate("/");
		};

		const handleError = () => {
			dispatch(appSlice.actions.logout());
			navigate("/auth/signin");
		};

		this.Get<LoginPayload>(
			`${UserRoutes.BASE}/${UserRoutes.GET_CURRENT_USER.ROUTE}`,
			handleSuccess,
			handleError,
			cancelToken,
		);
	};
}

export const userApi = new UserApi();
