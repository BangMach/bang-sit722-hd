# Frontend Testing and Security Setup

This directory contains the frontend of the e-commerce application with comprehensive testing and security scanning setup.

## 🚀 Features

- **Unit Testing**: Comprehensive Jest-based unit tests for JavaScript functions
- **Security Scanning**: Snyk integration for vulnerability detection and code quality
- **Coverage Reports**: Code coverage tracking and reporting
- **CI/CD Integration**: Full Jenkins pipeline integration

## 📁 Project Structure

```
frontend/
├── package.json          # Node.js dependencies and scripts
├── .snyk                 # Snyk security configuration
├── main.js               # Main application logic
├── index.html            # Main HTML file
├── nginx.conf            # Nginx configuration
├── Dockerfile            # Multi-stage Docker build
├── tests/
│   ├── setup.js          # Jest test setup and mocks
│   ├── main.test.js      # Main test suite
│   └── testHTML.js       # HTML template for testing
└── README.md             # This file
```

## 🧪 Testing

### Running Tests Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run all tests**:
   ```bash
   npm test
   ```

3. **Run tests with coverage**:
   ```bash
   npm run test:coverage
   ```

4. **Run tests in watch mode** (for development):
   ```bash
   npm run test:watch
   ```

### Test Coverage

The test suite includes:
- ✅ Utility function tests (formatCurrency, showMessage)
- ✅ DOM manipulation tests
- ✅ API interaction mocking and testing
- ✅ Form validation tests
- ✅ Shopping cart logic tests
- ✅ Error handling tests

Coverage thresholds are set to 70% for branches, functions, lines, and statements.

## 🔒 Security Scanning

### Snyk Integration

1. **Install Snyk**:
   ```bash
   npm install -g snyk
   ```

2. **Authenticate** (get token from https://snyk.io):
   ```bash
   snyk auth YOUR_TOKEN
   ```

3. **Scan for vulnerabilities**:
   ```bash
   npm run snyk:test
   ```

4. **Scan source code**:
   ```bash
   npm run security:scan
   ```

### Security Features
- Dependency vulnerability scanning
- Source code security analysis
- Docker image scanning
- Continuous monitoring setup

## 🐳 Docker Build

The Dockerfile uses multi-stage build:

1. **Test Stage**: Runs all tests and security scans
2. **Production Stage**: Creates optimized production image

```bash
# Build with tests
docker build -t frontend-app .

# Build production only (skip tests)
docker build --target production -t frontend-app .
```

## 🔧 Jenkins CI/CD Integration

The Jenkins pipeline includes:

1. **Frontend Test Stage**:
   - Installs Node.js and npm dependencies
   - Runs Jest unit tests with coverage
   - Executes Snyk security scanning
   - Publishes test results and coverage reports

2. **Docker Build Stage** (only if tests pass):
   - Builds Docker images for all services
   - Scans Docker images with Snyk
   - Pushes images to Azure Container Registry

### Jenkins Configuration Required

1. **Add Snyk Token Credential**:
   - Go to Jenkins → Credentials → Add Secret Text
   - ID: `SNYK_TOKEN`
   - Secret: Your Snyk authentication token

2. **Install Required Jenkins Plugins**:
   - HTML Publisher Plugin (for coverage reports)
   - Test Results Analyzer Plugin

## 🚦 Quality Gates

The pipeline enforces these quality gates:

- ✅ All unit tests must pass
- ✅ Code coverage must meet thresholds (70%)
- ✅ No high-severity security vulnerabilities in dependencies
- ✅ Source code security analysis passes
- 🔄 Docker images are built only if all tests pass

## 📊 Reports

After pipeline execution, you'll find:
- **Test Results**: Published in Jenkins test results
- **Coverage Report**: Available in Jenkins HTML reports
- **Security Report**: Snyk findings in console logs
- **Docker Scan Results**: Container vulnerability reports

## 🛠 Development

### Adding New Tests

1. Create test files in the `tests/` directory
2. Follow the existing naming convention: `*.test.js`
3. Use the setup in `tests/setup.js` for mocks and DOM setup
4. Run tests locally before committing

### Test Structure Example

```javascript
describe('Feature Name', () => {
    beforeEach(() => {
        // Setup for each test
    });
    
    test('should do something', () => {
        // Test implementation
        expect(result).toBe(expected);
    });
});
```

## 🔍 Troubleshooting

### Common Issues

1. **Tests failing in CI but passing locally**:
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for environment-specific issues

2. **Snyk authentication issues**:
   - Verify SNYK_TOKEN credential in Jenkins
   - Check token validity and permissions

3. **Docker build failures**:
   - Ensure tests pass before building
   - Check for dependency conflicts
   - Verify multi-stage build configuration

### Debugging Commands

```bash
# Check Node.js and npm versions
node --version && npm --version

# Verify dependencies
npm ls

# Run tests with verbose output
npm test -- --verbose

# Check Snyk configuration
snyk config list
```

## 📝 Next Steps

- [ ] Add E2E testing with Cypress or Playwright
- [ ] Implement performance testing
- [ ] Add accessibility testing
- [ ] Set up visual regression testing
- [ ] Enhance security scanning rules