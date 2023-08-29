import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { PORT } from "./src/config/constants";

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: PORT,
	},
	plugins: [react()],
});
