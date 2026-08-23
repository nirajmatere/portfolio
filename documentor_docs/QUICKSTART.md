# QUICKSTART

This project is a React application powered by Vite, featuring internationalization (i18next) and custom styling.

> **Note:** The repository snippets provided do not include a `package.json` file or CLI terminal commands. As per strictly provided context, standard command-line instructions (e.g., `npm install`, `npm run dev`) are omitted to avoid speculation.

---

## Explicitly Identified Dependencies

Based on code `import` statements across the repository context, the following packages are used:

* **Core & Build Tools:**
  * `react`
  * `react-dom`
  * `vite`
  * `@vitejs/plugin-react`

* **Internationalization:**
  * `i18next`
  * `react-i18next`
  * `i18next-browser-languagedetector`

* **Linting & Quality:**
  * `eslint`
  * `@eslint/js`
  * `globals`
  * `eslint-plugin-react-hooks`
  * `eslint-plugin-react-refresh`

---

## Environment Variables

* **No environment variables** are referenced or required in the provided code snippets.

---

## Application Configuration Notes

* **Vite:** Configured using `@vitejs/plugin-react`.
* **ESLint:** Configured for flat config JS/JSX files ignoring the `dist` directory.
* **Internationalization (i18n):** Supports English (`en`) and Japanese (`jp`) locales loaded via JSON files (`en.json`, `jp.json`), utilizing `localStorage` and browser `navigator` detection with `en` as fallback.
* **Static Assets:** The application expects a resume file located at `/Niraj_Resume.pdf`.