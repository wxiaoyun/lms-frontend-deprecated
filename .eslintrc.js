module.exports = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		project: ["./tsconfig.json", "./tsconfig.node.json"],
		tsconfigRootDir: __dirname,
	},
	plugins: ["@typescript-eslint"],
	extends: [
		"plugin:@typescript-eslint/recommended",
		"plugin:@typescript-eslint/strict-type-checked",
		"plugin:@typescript-eslint/stylistic-type-checked",
		"plugin:react/recommended",
		"plugin:react/jsx-runtime",
	],
	rules: {
		// Your custom rules here
	},
};
