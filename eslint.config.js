import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Игнорируем сборочные артефакты
  { ignores: ["dist/**"] },

  // Базовые правила JS
  js.configs.recommended,

  // Базовые правила TS
  ...tseslint.configs.recommended,

  // Браузерные глобалы для исходников
  {
    files: ["**/*.{js,ts}"],
    languageOptions: { globals: { ...globals.browser } },
  },

  // Node-глобалы для конфигов и скриптов
  {
    files: ["eslint.config.js", "rollup.config.js", "scripts/**"],
    languageOptions: { globals: { ...globals.node } },
  },
]);