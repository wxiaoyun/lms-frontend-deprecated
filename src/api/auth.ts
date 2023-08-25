import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CancelTokenSource } from "axios";

import { BaseApi } from "./base";
import { appSlice } from "../store";
import { NotifyError } from "../util";
import { userSchema, userSignInSchema } from "../schema";
import { AuthRoutes } from "../router";

class AuthApi extends BaseApi {
	private dispatch = useDispatch();
	private navigate = useNavigate();

	public Signup = (user: UserCreate, cancelToken?: CancelTokenSource) => {
		const handleSuccess = (data: Payload<LoginPayload>) => {
			if (!userSchema.isValidSync(data.data)) {
				this.dispatch(appSlice.actions.logout());
				this.navigate("/auth/signin");
				NotifyError("Invalid user data received from backend");
			} else {
				this.dispatch(appSlice.actions.login(data.data));
				this.navigate("/worksheet");
			}
		};
		const handlError = () => {
			this.dispatch(appSlice.actions.logout());
		};
		this.Post<UserCreate, LoginPayload>(
			`${AuthRoutes.BASE}/${AuthRoutes.SIGN_UP.ROUTE}}`,
			user,
			handleSuccess,
			handlError,
			cancelToken,
		);
	};

	public SignIn = (user: UserLogin, cancelToken?: CancelTokenSource) => {
		const handleSuccess = (data: Payload<LoginPayload>) => {
			if (!userSignInSchema.isValidSync(data.data)) {
				this.dispatch(appSlice.actions.logout());
				this.navigate("/auth/signin");
				NotifyError("Invalid user data received from backend");
			} else {
				this.dispatch(appSlice.actions.login(data.data));
				this.navigate("/worksheet");
			}
		};
		const handlError = () => {
			this.dispatch(appSlice.actions.logout());
		};

		this.Post<UserLogin, LoginPayload>(
			`${AuthRoutes.BASE}/${AuthRoutes.SIGN_IN.ROUTE}}`,
			user,
			handleSuccess,
			handlError,
			cancelToken,
		);
	};

	public SignOut = (cancelToken?: CancelTokenSource) => {
		const handleResult = () => {
			this.dispatch(appSlice.actions.logout());
			this.navigate("/auth/signin");
		};

		this.Get(
			`${AuthRoutes.BASE}/${AuthRoutes.SIGN_OUT.ROUTE}`,
			handleResult,
			handleResult,
			cancelToken,
		);
	};
}

export const authApi = new AuthApi();
