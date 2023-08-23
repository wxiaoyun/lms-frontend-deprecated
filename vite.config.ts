import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as Env from "./src/config/env";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
	Env.LoadFromVite(mode);

	return {
		server: {
			port: Env.GetPort(),
		},
		plugins: [react()],
	};
});
