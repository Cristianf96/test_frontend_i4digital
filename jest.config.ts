module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    transform: {
        '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
    testMatch: ['**/__tests__/**/*.test.(js|jsx|ts|tsx)'],
};
