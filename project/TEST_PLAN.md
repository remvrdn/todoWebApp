# Test Plan

## Scope
This test plan covers both the frontend React application and the backend Express API for the CRUD application. The testing strategy includes UI automation testing and API testing to ensure full functionality across the application stack.

### What is being tested:
- **Frontend (React App)**:
  - Login functionality with valid/invalid credentials
  - Dashboard navigation and user interface
  - CRUD operations for items (Create, Read, Update, Delete)
  - Form validation and error handling
  - User authentication state management

- **Backend (Express API)**:
  - Authentication endpoint (`POST /login`)
  - Items CRUD endpoints (`GET`, `POST`, `PUT`, `DELETE /items`)
  - Error handling for invalid requests
  - Data validation and response formats

## Tools

### UI Automation - Playwright
**Why Playwright was chosen:**
- Modern, fast, and reliable browser automation
- Cross-browser testing support (Chromium, Firefox, WebKit)
- Built-in waiting and retry mechanisms
- Excellent debugging capabilities with trace viewer
- Native TypeScript support
- Parallel test execution for faster test runs
- Visual testing capabilities with screenshots

### API Testing - Supertest + Node.js Test Runner
**Why Supertest was chosen:**
- Seamless integration with Express applications
- Simple, readable test syntax
- Built-in HTTP assertions
- No external dependencies beyond the application
- Works well with Node.js native test runner (no additional test framework needed)
- Lightweight and fast execution

## How to Run

### Prerequisites
```bash
# Install dependencies for both frontend and backend
npm install
cd backend && npm install && cd ..
```

### Start Applications
```bash
# Terminal 1: Start backend server
cd backend && npm start

# Terminal 2: Start frontend development server
npm run dev
```

### Run Tests

#### UI Tests (Playwright)
```bash
# Run all UI tests
npx playwright test

# Run tests in headed mode (see browser)
npx playwright test --headed

# Run specific test file
npx playwright test tests/e2e/login.spec.ts

# Run tests with debug mode
npx playwright test --debug

# Generate test report
npx playwright show-report
```

#### API Tests (Supertest)
```bash
# Run API tests
cd backend && npm test

# Run API tests with coverage
cd backend && npm run test:coverage
```

#### Run All Tests
```bash
# Run both frontend and backend tests
npm test
```

## Test Cases

### Frontend UI Tests

#### Login Page Tests (`tests/e2e/login.spec.ts`)
- ✅ Display login form elements
- ✅ Login with valid credentials (test@example.com / password123)
- ✅ Show error message with invalid credentials
- ✅ Form validation for empty fields

#### Dashboard Tests (`tests/e2e/dashboard.spec.ts`)
- ✅ Display dashboard with user information
- ✅ Create new item with name and description
- ✅ Edit existing item (inline editing)
- ✅ Delete item with confirmation
- ✅ Cancel add item form
- ✅ Cancel edit item operation
- ✅ Logout functionality

### Backend API Tests (`backend/test/api.test.js`)

#### Authentication Tests
- ✅ POST /login with valid credentials
- ✅ POST /login with invalid credentials
- ✅ POST /login with missing email
- ✅ POST /login with missing password

#### Items CRUD Tests
- ✅ GET /items returns items array
- ✅ POST /items creates new item with valid data
- ✅ POST /items fails with missing name
- ✅ POST /items fails with empty name
- ✅ POST /items fails with missing description
- ✅ PUT /items/:id updates existing item
- ✅ PUT /items/:id fails with invalid ID format
- ✅ PUT /items/:id fails with non-existent ID
- ✅ DELETE /items/:id deletes existing item
- ✅ DELETE /items/:id fails with invalid ID format
- ✅ DELETE /items/:id fails with non-existent ID

#### Health Check Tests
- ✅ GET /health returns status OK

## Assumptions

1. **Single User System**: The application is designed for demonstration purposes with a single hardcoded user account
2. **In-Memory Storage**: Data is stored in memory and will be reset when the server restarts
3. **Local Development**: Tests are designed to run in a local development environment
4. **Network Availability**: Backend server must be running on `localhost:3001` for frontend tests to pass
5. **Browser Requirements**: Modern browsers supporting ES6+ features are required for the frontend
6. **No Authentication Persistence**: Login state is maintained via localStorage but not validated server-side

## Limitations

1. **No Persistent Database**: 
   - Data is lost on server restart
   - No data backup or recovery mechanisms
   - Not suitable for production use

2. **No User Registration**: 
   - Only one hardcoded user account exists
   - No user management functionality
   - No password reset capabilities

3. **Limited Security**: 
   - No JWT tokens or session management
   - No HTTPS enforcement
   - Basic authentication only

4. **No Concurrent User Support**: 
   - Designed for single-user scenarios
   - No conflict resolution for simultaneous edits
   - Shared in-memory state across all connections

5. **Basic Error Handling**: 
   - Limited error recovery mechanisms
   - No retry logic for network failures
   - Simple error messages

6. **Testing Environment**: 
   - Tests require both frontend and backend to be running
   - No mocking of external dependencies
   - Database state not isolated between tests

## Coverage Goals

- **Frontend**: Aim for >80% code coverage including all major user flows
- **Backend**: Aim for >90% code coverage including all API endpoints and error cases
- **Integration**: All critical user journeys tested end-to-end

## Continuous Integration

The application is ready for CI/CD integration with:
- Automated test execution on pull requests
- Cross-browser testing support
- Test result reporting
- Coverage reporting
- Visual regression testing capabilities

## Future Enhancements

1. **Database Integration**: Replace in-memory storage with persistent database
2. **Advanced Authentication**: Implement JWT tokens and proper session management  
3. **User Management**: Add user registration, password reset, and profile management
4. **Real-time Updates**: Implement WebSocket connections for live data updates
5. **Performance Testing**: Add load testing for API endpoints
6. **Security Testing**: Implement security vulnerability scanning
7. **Mobile Testing**: Add mobile device testing scenarios