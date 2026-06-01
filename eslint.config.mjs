import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

const browserGlobals = {
  console: "readonly",
  document: "readonly",
  fetch: "readonly",
  Headers: "readonly",
  ImageData: "readonly",
  IntersectionObserver: "readonly",
  MouseEvent: "readonly",
  navigator: "readonly",
  React: "readonly",
  Request: "readonly",
  Response: "readonly",
  setInterval: "readonly",
  clearInterval: "readonly",
  TextEncoder: "readonly",
  window: "readonly",
};

const nodeGlobals = {
  process: "readonly",
};

export default [
  {
    ignores: [
      ".next/**",
      ".agents/**",
      "node_modules/**",
      "next-env.d.ts",
      "tsconfig.tsbuildinfo",
    ],
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...browserGlobals,
        ...nodeGlobals,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-undef": "off",
    },
  },
];
