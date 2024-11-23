import globals from "globals";
import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Emulate __dirname using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname, // Base directory for resolving plugin paths
});

export default [
    {
        files: ["./src/**.ts"]
    },
    {
        ignores: ["*.config.mjs", ".prettierrc.json"] 
    },
    {
        languageOptions: { globals: globals.browser }
    },
    ...compat.extends('plugin:@typescript-eslint/recommended'),
    ...compat.extends('plugin:prettier/recommended'),
    {
        // these rules are in addition of the recommended rules used above
        rules: {
            "@typescript-eslint/no-explicit-any": ["off"], // allow any type
            "quotes": ["off"], // single quotes enforced by formatter
            "@typescript-eslint/no-unused-expressions": ["off"], // allow unused expressions
            "indent": ["warn"], // enforce 4 space indentation
            "semi": ["error", "always"], // enforce use of semi-colon
            "linebreak-style": ["error", "unix"], // enforce unix-based line breaks
            "no-console": ["off"], // allow use of console.log() and console.error()
            "curly": ["error", "all"], // enforce use of curly braces
            "comma-dangle": ["error", "always-multiline"], // enforce dangling comma in array and object definitions
            "brace-style": ["error", "1tbs"], // enforce 1tbs standard for function and class structure
            "no-unused-vars": ["off"], // warn about unused variables
            "@typescript-eslint/no-unused-vars": ["warn"], // warn about unused variables
            "prefer-const": ["off"], // warn about using const instead of let
        }
    }
];