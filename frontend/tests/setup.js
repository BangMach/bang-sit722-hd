// Jest setup file for DOM testing
require('@testing-library/jest-dom');

// Mock fetch API for testing
globalThis.fetch = jest.fn();

// Mock console methods to reduce noise in tests
globalThis.console = {
    ...console,
    // Uncomment to ignore console logs and warnings during tests
    // log: jest.fn(),
    // warn: jest.fn(),
    error: jest.fn()
};

// Setup DOM environment
beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    
    // Reset DOM
    document.body.innerHTML = '';
    
    // Reset fetch mock
    fetch.mockClear();
});

// Mock setTimeout and clearTimeout for testing
globalThis.setTimeout = jest.fn(() => {
    return jest.fn();
});

globalThis.clearTimeout = jest.fn();