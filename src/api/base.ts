import axios, { AxiosError, AxiosResponse, CancelTokenSource } from "axios";

import * as Constants from "../config/constants";
import store from "../store/store";
import { NotifyError, NotifyFromResponse, Query } from "../util";
import { appSlice } from "../store/";

axios.defaults.withCredentials = true;
axios.interceptors.response.use(
	// Intercepts all requests and logs them to the console and displays the backend message to the user
	(res: AxiosResponse<Payload>) => {
		// Logs the url, method and url of the request
		console.info(`[${res.config.method?.toUpperCase()}]: ${res.config.url}`);
		// Displays the backend message to the user
		if (res.data.messages) NotifyFromResponse(res.data);
		return res;
	},
	// Intercepts all errors and logs them to the console and displays the backend message to the user
	(err: AxiosError<Payload>) => {
		if (axios.isCancel(err)) {
			console.info("Request canceled", err.message);
		}

		// Logs the url, method and url of the request
		console.error(`[${err.config?.method?.toUpperCase()}]: ${err.config?.url}`);
		console.error("Error: ", err);
		// Displays the backend message to the user
		if (err.response?.data) NotifyFromResponse(err.response?.data);
		return Promise.reject(err);
	},
);

/**
 * Base class for all api classes.
 * Makes GET POST PATCH DELETE requests to the backend server.
 * Logs the requests and responses to the console.
 * Sends notifications to the user based on the response.
 * Performs specified on the response / error using the provided handlers.
 * @param R Payload type
 * @param T Response type
 */
export class BaseApi {
	private BASE_URL = Constants.BACKEND_BASE_URL;

	protected Get = <R>(
		url: string,
		successHandler?: ResponseHandler<R>,
		errorHandler?: ErrorHandler,
		cancelToken?: CancelTokenSource,
	) => {
		store.dispatch(appSlice.actions.setLoading(true));
		axios
			.get<unknown, AxiosResponse<Payload<R>>, unknown>(
				`${this.BASE_URL}/${url}`,
				{
					cancelToken: cancelToken?.token,
				},
			)
			.then((res) => {
				if (!successHandler) return;
				successHandler(res.data);
			})
			.catch((err: AxiosError<Payload>) => {
				if (!err.response) return;
				if (errorHandler) errorHandler(err.response.data);
			})
			.finally(
				() =>
					store.getState().app.isLoading &&
					store.dispatch(appSlice.actions.setLoading(false)),
			);
	};

	protected List = <R>(
		url: string,
		cq: Query,
		successHandler?: ResponseHandler<R>,
		errorHandler?: ErrorHandler,
		cancelToken?: CancelTokenSource,
	) => {
		store.dispatch(appSlice.actions.setLoading(true));
		axios
			.get<unknown, AxiosResponse<Payload<R>>, unknown>(
				`${this.BASE_URL}/${url}?${cq.toString()}`,
				{
					cancelToken: cancelToken?.token,
				},
			)
			.then((res) => {
				if (!successHandler) return;
				successHandler(res.data);
			})
			.catch((err: AxiosError<Payload>) => {
				if (!err.response) return;
				if (errorHandler) errorHandler(err.response.data);
			})
			.finally(
				() =>
					store.getState().app.isLoading &&
					store.dispatch(appSlice.actions.setLoading(false)),
			);
	};

	protected Post = <T, R = T>(
		url: string,
		data: T,
		successHandler?: ResponseHandler<R>,
		errorHandler?: ErrorHandler,
		cancelToken?: CancelTokenSource,
	) => {
		store.dispatch(appSlice.actions.setLoading(true));
		axios
			.post<T, AxiosResponse<Payload<R>>, T>(`${this.BASE_URL}/${url}`, data, {
				cancelToken: cancelToken?.token,
			})
			.then((res) => {
				if (!successHandler) return;
				successHandler(res.data);
			})
			.catch((err: AxiosError<Payload>) => {
				if (!err.response) return;
				if (errorHandler) errorHandler(err.response.data);
			})
			.finally(
				() =>
					store.getState().app.isLoading &&
					store.dispatch(appSlice.actions.setLoading(false)),
			);
	};

	protected Patch = <T, R = T>(
		url: string,
		data: T,
		successHandler?: ResponseHandler<R>,
		errorHandler?: ErrorHandler,
		cancelToken?: CancelTokenSource,
	) => {
		store.dispatch(appSlice.actions.setLoading(true));
		axios
			.patch<T, AxiosResponse<Payload<R>>, T>(`${this.BASE_URL}/${url}`, data, {
				cancelToken: cancelToken?.token,
			})
			.then((res) => {
				if (!successHandler) return;
				successHandler(res.data);
			})
			.catch((err: AxiosError<Payload<T>>) => {
				if (!err.response) return;
				if (errorHandler) errorHandler(err.response.data);
			})
			.finally(
				() =>
					store.getState().app.isLoading &&
					store.dispatch(appSlice.actions.setLoading(false)),
			);
	};

	protected Delete = <T, R = T>(
		url: string,
		successHandler?: ResponseHandler<R>,
		errorHandler?: ErrorHandler,
		cancelToken?: CancelTokenSource,
	) => {
		store.dispatch(appSlice.actions.setLoading(true));
		axios
			.delete<T, AxiosResponse<Payload<R>>, T>(`${this.BASE_URL}/${url}`, {
				cancelToken: cancelToken?.token,
			})
			.then((res) => {
				if (!successHandler) return;
				successHandler(res.data);
			})
			.catch((err: AxiosError<Payload<T>>) => {
				if (!err.response) return;
				if (errorHandler) errorHandler(err.response.data);
			})
			.finally(
				() =>
					store.getState().app.isLoading &&
					store.dispatch(appSlice.actions.setLoading(false)),
			);
	};

	public GetHealth = () => {
		axios
			.get<unknown, AxiosResponse<Payload>, unknown>(`${this.BASE_URL}/health`)
			.catch(() => {
				store.dispatch(
					appSlice.actions.setBackendStatus(Constants.BACKEND_STATUS_DOWN),
				);
				NotifyError("Backend is not available");
			})
			.finally(
				() =>
					store.getState().app.isLoading &&
					store.dispatch(appSlice.actions.setLoading(false)),
			);
	};
}

export const baseApi = new BaseApi();
export default baseApi;
