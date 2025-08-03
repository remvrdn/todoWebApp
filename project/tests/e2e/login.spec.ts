import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    // Start from the login page
    await page.goto('http://localhost:5173');
  });

  test('should display login form', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Welcome Back');
    await expect(page.getByTestId('email-input')).toBeVisible();
    await expect(page.getByTestId('password-input')).toBeVisible();
    await expect(page.getByTestId('login-button')).toBeVisible();
  });

  test('should login with valid credentials', async ({ page }) => {
    await page.getByTestId('email-input').fill('test@example.com');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('login-button').click();

    // Should redirect to dashboard
    await expect(page.locator('h1')).toContainText('Dashboard');
    await expect(page.getByText('Welcome back, test@example.com')).toBeVisible();
  });

  test('should show error with invalid credentials', async ({ page }) => {
    await page.getByTestId('email-input').fill('wrong@example.com');
    await page.getByTestId('password-input').fill('wrongpassword');
    await page.getByTestId('login-button').click();

    await expect(page.getByTestId('error-message')).toContainText('Invalid credentials');
  });

  test('should show error with empty fields', async ({ page }) => {
    await page.getByTestId('login-button').click();

    // The form should prevent submission with empty required fields
    await expect(page.locator('h1')).toContainText('Welcome Back');
  });
});