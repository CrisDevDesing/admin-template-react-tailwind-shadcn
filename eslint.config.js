// @ts-check
import tseslint from "typescript-eslint";
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config([
  // Ignorar a pasta de build
  { ignores: ["dist"] },

  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Regras recomendadas para TS + Type Checking
      ...tseslint.configs.recommendedTypeChecked,
      // Se quiseres ser mais restritivo, usa strictTypeChecked
      // ...tseslint.configs.strictTypeChecked,

      // Regras de estilo opcionais
      ...tseslint.configs.stylisticTypeChecked,

      // Regras para React e React DOM
      reactX.configs["recommended-typescript"],
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]);
