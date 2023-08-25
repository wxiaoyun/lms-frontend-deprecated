import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CancelTokenSource } from "axios";

import { BaseApi } from "./base";
import { appSlice } from "../store";
import { NotifyError } from "../util";
import { userSignInSchema } from "../schema";
import { UserRoutes } from "../router";

class UserApi extends BaseApi {
	private dispatch = useDispatch();
	private navigate = useNavigate();

	public GetCurrentUser = (cancelToken?: CancelTokenSource) => {
		const handleSuccess = (data: Payload<LoginPayload>) => {
			if (!userSignInSchema.isValidSync(data.data)) {
				this.dispatch(appSlice.actions.logout());
				this.navigate("/auth/signin");
				NotifyError("Invalid user data received from backend");
				return;
			}
			this.dispatch(appSlice.actions.login(data.data));
			this.navigate("/");
		};

		const handleError = () => {
			this.dispatch(appSlice.actions.logout());
			this.navigate("/auth/signin");
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
