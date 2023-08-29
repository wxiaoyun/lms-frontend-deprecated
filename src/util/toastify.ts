import { toast } from "react-toastify";
import * as Constants from "../config/constants";

export const NotifyWarn = (message: string, timeout?: number) => {
	toast.warn(message, {
		position: toast.POSITION.BOTTOM_LEFT,
		autoClose: timeout,
	});
};

export const NotifyError = (message: string, timeout?: number) => {
	toast.error(message, {
		position: toast.POSITION.BOTTOM_LEFT,
		autoClose: timeout,
	});
};

export const NotifySuccess = (message: string, timeout?: number) => {
	toast.success(message, {
		position: toast.POSITION.BOTTOM_LEFT,
		autoClose: timeout,
	});
};

export const NotifyInfo = (message: string, timeout?: number) => {
	toast.info(message, {
		position: toast.POSITION.BOTTOM_LEFT,
		autoClose: timeout,
	});
};

export const NotifyFromResponse = (payload: Payload) => {
	let delay = 0; // Initial delay time

	for (const message of payload.messages) {
		setTimeout(() => {
			switch (message.code) {
				case Constants.API_MESSAGE_TYPE_SILENT:
					break;
				case Constants.API_MESSAGE_TYPE_SUCCESS:
					NotifySuccess(message.message);
					break;
				case Constants.API_MESSAGE_TYPE_ERROR:
					NotifyError(message.message);
					break;
				case Constants.API_MESSAGE_TYPE_WARNING:
					NotifyWarn(message.message);
					break;
				case Constants.API_MESSAGE_TYPE_INFO:
					NotifyInfo(message.message);
					break;
				default:
					NotifyInfo(message.message);
					break;
			}
		}, delay);

		delay += 200; // Increment the delay by 200ms for each iteration
	}
};
