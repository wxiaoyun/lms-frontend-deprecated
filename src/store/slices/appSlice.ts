import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: AppState = {
	isLoggedIn: false,
	isLoading: false,
	backendStatus: "unknown",
	user: null,
};

export const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		login: (state, action: PayloadAction<LoginPayload>) => {
			state.isLoggedIn = true;
			state.user = action.payload;
		},
		logout: (state) => {
			state.isLoggedIn = false;
			state.user = null;
		},
		setLoading: (state, action: PayloadAction<boolean>) => {
			state.isLoading = action.payload;
		},
		setBackendStatus: (state, action: PayloadAction<BackendStatus>) => {
			state.backendStatus = action.payload;
		},
	},
});
