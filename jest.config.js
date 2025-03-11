/** @type {import('jest').Config} */
const config = {
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    testPathIgnorePatterns: [
      "<rootDir>/node_modules/",
      "<rootDir>/.next/"
    ],
    transform: {
      "^.+\\.(t|j)sx?$": ["@swc/jest", {
        jsc: {
          transform: {
            react: {
              runtime: "automatic"
            }
          }
        }
      }]
    },
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/$1",
      "\\.(css|less|scss|sass)$": "identity-obj-proxy"
    },
    collectCoverageFrom: [
      "**/*.{js,jsx,ts,tsx}",
      "!**/*.d.ts",
      "!**/node_modules/**",
      "!**/.next/**",
      "!**/coverage/**",
      "!jest.config.js",
    ],
  };
  
  module.exports = config;
  