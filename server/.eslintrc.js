module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: "module" // Allows for the use of imports
      },
      ecmaFeatures: {
        jsx: true, // Allows for the parsing of JSX
        tsx: true
      },
      settings: {
        react: {
          version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
        }
      },
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint',"react", 'prettier', "react-hooks"],
    extends: [
        "plugin:react/recommended",
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier:recommended',
        "prettier/@typescript-eslint",
        "prettier/babel",
        "prettier/flowtype",
        "prettier/react",
        "prettier/standard",
    ],

    rules: { 'prettier/prettier': 'error'},
}
