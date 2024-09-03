import type { Config } from 'jest'

export default {
    collectCoverage: true,
    testEnvironment: "jsdom",
    testEnvironmentOptions: {
      customExportConditions: [''],
    },
    coverageReporters: ["json", "html"],
    moduleNameMapper: {
      "\\.(css|less|sass|scss)$": "identity-obj-proxy",
      "^@/(.*)$": "<rootDir>/src/$1",
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    transform: {
      '^.+\\.tsx?$': [
        'ts-jest',
        {
          diagnostics: {
            ignoreCodes: [1343],
          },
          astTransformers: {
            before: [
              {
                path: 'node_modules/ts-jest-mock-import-meta',
                options: {
                  metaObjectReplacement: {
                    env: {
                      VITE_PUBLIC_KEY: '61371679183a78fb25d270d2a040f98e',
                      VITE_PRIVATE_KEY: '13a5b759e62175992a055df0eefa75dd9ccc996c',
                      VITE_API_URL: 'http://gateway.marvel.com/v1',
                    },
                  },
                },
              },
            ],
          },
        },
      ],
      '^.+\\.svg$': 'jest-transformer-svg',
    },
  } satisfies Config