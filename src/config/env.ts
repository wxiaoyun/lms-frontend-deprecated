import { loadEnv } from "vite";
import * as Constants from "./constants";

let ENV: Record<string, string>;

/**
 * Loads environment variables from Vite
 * @param mode Vite mode
 */
export function LoadFromVite(mode: string) {
	const env = loadEnv(mode, process.cwd(), "");
	ENV = env;
}

/**
 * Gets environment variable value
 * Must be called after LoadFromVite
 * @param key Environment variable key
 * @returns Environment variable value
 */
export function GetEnv(key: string) {
	return ENV[key];
}

/**
 * @returns Port number
 */
export function GetPort() {
	return Number(ENV.PORT || Constants.DEFAULR_PORT);
}
