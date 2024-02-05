const VITE_PORT = 5174;

module.exports = {
  preset: 'jest-puppeteer',
  browserContext: 'default',
  launch: {
    headless: "new",
  },
  testMatch: ['**/*.e2e-spec.ts?(x)'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '.+\\.(css|scss|png|jpg|svg)$': 'jest-transform-stub',
  },
  moduleNameMapper: {
    '\\.(scss|sass|css|less)$': 'identity-obj-proxy',
    '^@quicker/(.*)$': '<rootDir>/src/$1',
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@hooks/(.*)$': '<rootDir>/src/hooks/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@data/(.*)$': '<rootDir>/src/data/$1',
    '^@features/(.*)$': '<rootDir>/src/features/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mocks__/assetMock.ts',
    '^react-router-dom$': '<rootDir>/src/__mocks__/react-router-dom.ts',
  },
  setupFiles: ['./jest-puppeteer.setup.cjs'],
  server: {
    command: `npm run dev  -- --port ${VITE_PORT}`,
    port: VITE_PORT,
    launchTimeout: 10000,
    debug: true,
  },
};
