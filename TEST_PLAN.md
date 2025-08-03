# ✅ Test Plan / Strategy – Fullstack React + Express App

## 1. Purpose & Scope
This test plan outlines the strategy for testing a fullstack application built with React (frontend) and Express (backend). The goal is to ensure correct functionality, error handling, and stability across both the UI and API layers.

---

## 2. Test Coverage

### 🖥️ UI Tests (via Playwright)
- **Login Functionality**
  - Valid and invalid credential login tests
- **CRUD Operations**
  - Create, edit, and delete items
- **Form Validation**
  - Required fields, incorrect inputs, real-time error messages
- **Navigation**
  - Page transitions, logout, route protections

### 🔌 API Tests (via Supertest)
- **Authentication Endpoints**
  - `/login`, `/logout`, `/verify-token`, etc.
- **CRUD Operations**
  - POST / PUT / GET / DELETE with positive and negative scenarios
- **Error Handling & Validation**
  - Missing fields, invalid formats, unauthorized requests
- **Edge Cases**
  - Invalid IDs, malformed JSON, empty bodies, injection attempts

---

## 3. Tools Used & Justification

| Tool             | Purpose              | Reason                                                   |
|------------------|----------------------|-----------------------------------------------------------|
| **Playwright**   | UI Testing           | Fast, modern, supports multiple browsers, user simulation |
| **Supertest**    | API Testing          | Easy to use with Express and async-friendly               |
| **C8**           | Code Coverage        | Generates CLI-based coverage reports                      |
| **Concurrently** | Dev/Test Workflow    | Allows frontend/backend to run in parallel                |

---

## 4. How to Run Tests

## 🧪 Running Tests

### UI Tests (Playwright)
```bash
# Run all UI tests
npx playwright test

# Run with browser visible
npx playwright test --headed

# Debug mode
npx playwright test --debug

# View test report
npx playwright show-report
```

### API Tests (Supertest)
```bash
# Run API tests
npm run test:onlybackend

```

## 🏗️ Project Structure

```
├── src/                    # Frontend React application
│   ├── components/         # React components
│   │   ├── LoginPage.tsx   # Login page component
│   │   └── Dashboard.tsx   # Dashboard component
│   ├── App.tsx            # Main app component
│   └── main.tsx           # App entry point
├── backend/               # Backend Express server
│   ├── server.js          # Express server
│   ├── test/              # API tests
│   └── package.json       # Backend dependencies
├── tests/e2e/             # End-to-end UI tests
│   ├── login.spec.ts      # Login page tests
│   └── dashboard.spec.ts  # Dashboard tests
├── playwright.config.ts   # Playwright configuration
├── TEST_PLAN.md          # Detailed test documentation
└── README.md             # This file
```
