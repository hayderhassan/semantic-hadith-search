import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier/recommended";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import { defineConfig, globalIgnores } from "eslint/config";

export const ignorePattern = [".husky/", ".next/", "out/", "build/", "src/components/ui/"];

export default defineConfig([
	globalIgnores(ignorePattern),
	{
		name: "core-js-ts",
		files: ["**/*.{js,jsx,ts,tsx,mts,cts}"],
		extends: ["js/recommended"],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
				ecmaVersion: "latest",
				sourceType: "module",
			},
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		plugins: {
			js,
			"@typescript-eslint": tseslint.plugin,
			import: importPlugin,
		},
		rules: {
			...tseslint.configs.recommendedTypeChecked.rules,
			"import/order": ["warn", { groups: ["builtin", "external", "internal"] }],
			"import/no-unresolved": "error",
		},
	},
	{
		name: "react-accessibility-style",
		files: ["**/*.{jsx,tsx}"],
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
			globals: {
				React: true,
			},
		},
		plugins: {
			react,
			jsxA11y,
		},
		settings: {
			react: {
				version: "detect",
				pragma: "React",
			},
		},
		rules: {
			"react/react-in-jsx-scope": "off",
			"react/jsx-uses-react": "error",
			"react/jsx-uses-vars": "error",
			"jsxA11y/alt-text": "error",
		},
	},
	{
		name: "json",
		files: ["**/*.json"],
		ignores: ["package-lock.json"],
		plugins: { json },
		language: "json/json",
		rules: {
			"json/no-duplicate-keys": "error",
			"json/no-empty-keys": "error",
			"json/no-unnormalized-keys": "error",
			"json/no-unsafe-values": "error",
		},
	},
	{
		name: "markdown",
		files: ["**/*.md"],
		plugins: { markdown },
		language: "markdown/gfm",
		rules: {
			"markdown/fenced-code-language": "error",
			"markdown/heading-increment": "error",
			"markdown/no-bare-urls": "off",
			"markdown/no-duplicate-definitions": "error",
			"markdown/no-duplicate-headings": "off",
			"markdown/no-empty-definitions": "error",
			"markdown/no-empty-images": "error",
			"markdown/no-empty-links": "error",
			"markdown/no-html": "off",
			"markdown/no-invalid-label-refs": "error",
			"markdown/no-missing-atx-heading-space": "error",
			"markdown/no-missing-label-refs": "error",
			"markdown/no-missing-link-fragments": "error",
			"markdown/no-multiple-h1": "error",
			"markdown/no-reference-like-urls": "error",
			"markdown/no-reversed-media-syntax": "error",
			"markdown/no-space-in-emphasis": "error",
			"markdown/no-unused-definitions": "error",
			"markdown/require-alt-text": "error",
			"markdown/table-column-count": "error",
		},
	},
	prettier,
]);
