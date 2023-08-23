import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const DEFAULR_PORT = "3000";
const PORT = Number(process.env.PORT || DEFAULR_PORT);

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		port: PORT,
	},
	plugins: [react()],
});
