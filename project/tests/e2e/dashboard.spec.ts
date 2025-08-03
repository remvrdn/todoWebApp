import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('http://localhost:5173');
    await page.getByTestId('email-input').fill('test@example.com');
    await page.getByTestId('password-input').fill('password123');
    await page.getByTestId('login-button').click();
    
    // Wait for dashboard to load
    await expect(page.locator('h1')).toContainText('Dashboard');
  });

  test('should display dashboard with user info', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Dashboard');
    await expect(page.getByText('Welcome back, test@example.com')).toBeVisible();
    await expect(page.getByTestId('add-item-button')).toBeVisible();
    await expect(page.getByTestId('logout-button')).toBeVisible();
  });

  test('should create new item', async ({ page }) => {
    await page.getByTestId('add-item-button').click();
    
    await page.getByTestId('add-name-input').fill('Test Item');
    await page.getByTestId('add-description-input').fill('Test Description');
    await page.getByTestId('save-add-button').click();

    // Verify item appears in the list
    await expect(page.getByTestId('items-grid')).toContainText('Test Item');
    await expect(page.getByTestId('items-grid')).toContainText('Test Description');
  });

  test('should edit existing item', async ({ page }) => {
    // First create an item
    await page.getByTestId('add-item-button').click();
    await page.getByTestId('add-name-input').fill('Original Item');
    await page.getByTestId('add-description-input').fill('Original Description');
    await page.getByTestId('save-add-button').click();

    // Wait for item to appear
    await expect(page.getByText('Original Item')).toBeVisible();

    // Find the item and click edit - we need to be more specific about which edit button
    const itemCards = page.locator('[data-testid^="item-"]');
    const targetItem = itemCards.filter({ hasText: 'Original Item' }).first();
    await targetItem.locator('[data-testid^="edit-button-"]').click();

    // Edit the item
    const editNameInput = targetItem.locator('[data-testid^="edit-name-"]');
    const editDescInput = targetItem.locator('[data-testid^="edit-description-"]');
    const saveButton = targetItem.locator('[data-testid^="save-edit-"]');
    const input = page.locator('input');
    const textarea = page.locator('textarea');
    const onlySaveButton = page.locator('[data-testid^="save-edit-"]');
    //textarea
    await input.clear();
    await input.fill('Updated Item');
    //await editNameInput.fill('Updated Item');
    await textarea.clear();
    await textarea.fill('Updated Description');
    //await editDescInput.fill('Updated Description');
    await onlySaveButton.click();

    // Verify changes
    await expect(page.getByText('Updated Item')).toBeVisible();
    await expect(page.getByText('Updated Description')).toBeVisible();
    //await expect(page.getByText('Original Item')).not.toBeVisible();
  });

  test('should delete item', async ({ page }) => {
    // First create an item
    await page.getByTestId('add-item-button').click();
    await page.getByTestId('add-name-input').fill('Item to Delete');
    await page.getByTestId('add-description-input').fill('Will be deleted');
    await page.getByTestId('save-add-button').click();

    // Wait for item to appear
    await expect(page.getByText('Item to Delete')).toBeVisible();

    // Find the item and click delete
    const itemCards = page.locator('[data-testid^="item-"]');
    const targetItem = itemCards.filter({ hasText: 'Item to Delete' }).first();
    
    // Handle the confirmation dialog
    page.on('dialog', dialog => dialog.accept());
    await targetItem.locator('[data-testid^="delete-button-"]').click();

    // Verify item is gone
    await expect(page.getByText('Item to Delete')).not.toBeVisible();
  });

  test('should logout successfully', async ({ page }) => {
    await page.getByTestId('logout-button').click();
    
    // Should return to login page
    await expect(page.locator('h1')).toContainText('Welcome Back');
    await expect(page.getByTestId('email-input')).toBeVisible();
  });

  test('should cancel add item form', async ({ page }) => {
    await page.getByTestId('add-item-button').click();
    
    await page.getByTestId('add-name-input').fill('Test Item');
    await page.getByTestId('cancel-add-button').click();

    // Form should be hidden
    await expect(page.getByTestId('add-name-input')).not.toBeVisible();
  });

  test('should cancel edit item', async ({ page }) => {
    // First create an item
    await page.getByTestId('add-item-button').click();
    await page.getByTestId('add-name-input').fill('Test Item');
    await page.getByTestId('add-description-input').fill('Test Description');
    await page.getByTestId('save-add-button').click();

    // Wait for item to appear
    await expect(page.getByText('Test Item')).toBeVisible();

    // Find the item and click edit
    const itemCards = page.locator('[data-testid^="item-"]');
    const targetItem = itemCards.filter({ hasText: 'Test Item' }).first();
    await targetItem.locator('[data-testid^="edit-button-"]').click();

    // Make some changes
    const editNameInput = page.locator('[data-testid^="edit-name-"]');
    await editNameInput.fill('Changed Name');

    // Cancel edit
    const cancelButton = page.locator('[data-testid^="cancel-edit-"]');
    await cancelButton.click();

    // Original content should still be there
    await expect(page.getByText('Changed Name')).not.toBeVisible();
  });
});