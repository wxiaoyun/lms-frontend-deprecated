interface AppState {
	isLoggedIn: boolean;
	isLoading: boolean;
	backendStatus: BackendStatus;
	user: LoginPayload | null;
}

type BackendStatus = "up" | "down" | "unknown";
