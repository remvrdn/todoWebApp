# Full-Stack CRUD Application

A modern full-stack web application built with React, Node.js, and Express, featuring a beautiful neon-themed UI and comprehensive testing suite.

## ✨ Features

- 🔐 **Authentication System** - Secure login with validation
- 📝 **CRUD Operations** - Create, read, update, and delete items
- 🎨 **Neon UI Theme** - Beautiful purple gradient design with glassmorphism effects
- 🧪 **Comprehensive Testing** - Both UI automation and API testing
- 📱 **Responsive Design** - Works perfectly on all devices
- ⚡ **Real-time Updates** - Immediate UI feedback for all operations

## 🚀 Quick Start (1-2 minutes setup)

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation & Setup

```bash
# 1. Install all dependencies
npm install

# 2. Install backend dependencies
cd backend && npm install && cd ..

# 3. Install Playwright browsers (for testing)
npx playwright install
```

### Start the Application

```bash
# Terminal 1: Start both applications with one command
npm start
# or
# Terminal 2: Frontend development server  
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

### Demo Credentials
- **Email**: `test@example.com`
- **Password**: `password123`

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

## 🔧 API Endpoints

### Authentication
- `POST /login` - Login with email and password

### Items CRUD
- `GET /items` - Get all items
- `POST /items` - Create new item
- `PUT /items/:id` - Update item by ID
- `DELETE /items/:id` - Delete item by ID

### Health Check
- `GET /health` - Server health status

## 🎨 Design Features

- **Neon Purple Theme** - Modern gradient design with purple/violet/magenta colors
- **Glassmorphism Effects** - Backdrop blur and translucent elements
- **Smooth Animations** - Hover effects and transitions
- **Responsive Layout** - Mobile-first design approach
- **Accessibility** - Proper contrast ratios and keyboard navigation

## 🧪 Test Coverage

### UI Tests
- ✅ Login with valid/invalid credentials
- ✅ Create, edit, and delete items
- ✅ Form validation and error handling
- ✅ Navigation and logout functionality

### API Tests
- ✅ Authentication endpoints
- ✅ CRUD operations with positive/negative cases
- ✅ Error handling and validation
- ✅ Edge cases and malformed requests

## 🔒 Environment Variables

No environment variables are required for local development. The application uses:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3001`

## 📋 Requirements Met

✅ **Backend**: Express server with in-memory storage  
✅ **Frontend**: React with neon purple theme  
✅ **Authentication**: Login system with validation  
✅ **CRUD Operations**: Full create, read, update, delete functionality  
✅ **UI Testing**: Playwright automation testing  
✅ **API Testing**: Supertest with comprehensive coverage  
✅ **Documentation**: Complete test plan and setup instructions  
✅ **Error Handling**: Proper validation and error responses  
✅ **Responsive Design**: Works on all screen sizes  

## 🚀 Production Notes

This is a demonstration application with in-memory storage. For production use, consider:

- Replace in-memory storage with a persistent database
- Implement JWT authentication with refresh tokens
- Add rate limiting and security headers
- Set up proper logging and monitoring
- Configure HTTPS and security best practices
- Add user registration and password reset functionality

---

**Created by Irem Vardan** - A comprehensive full-stack application showcasing modern web development practices with complete testing coverage.
