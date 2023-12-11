import { configureStore } from "@reduxjs/toolkit";
import { appSlice, bookSlice } from ".";

const store = configureStore({
	reducer: {
		app: appSlice.reducer,
		book: bookSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
