import { test, expect } from '@playwright/test';

test.describe('User Registration', () => {

  test('Positive: register with valid data', async ({ page }) => {
    await page.goto('http://localhost:8000/register');

    const id = Date.now();
    await page.fill('#username', `testuser_${id}`);
    await page.fill('#email', `testuser_${id}@example.com`);
    await page.fill('#first_name', 'Test');
    await page.fill('#last_name', 'User');
    await page.fill('#password', 'SecurePass123!');
    await page.fill('#confirm_password', 'SecurePass123!');

    await page.locator('form#registrationForm').getByRole('button', { name: 'Register' }).click();

    // Wait for success message
    const successLocator = page.locator('#successMessage');
    await successLocator.waitFor({ state: 'visible'});
    await expect(successLocator).toContainText(/Registration successful/);

    // Optional: confirm redirect to login page
    await page.waitForURL('**/login');
  });

  test('Negative: register with short password', async ({ page }) => {
    await page.goto('http://localhost:8000/register');

    await page.fill('#username', 'shortpassuser');
    await page.fill('#email', 'shortpass@example.com');
    await page.fill('#first_name', 'Short');
    await page.fill('#last_name', 'Pass');
    await page.fill('#password', '123');
    await page.fill('#confirm_password', '123');

    await page.click('button:text("Register")');

    const errorLocator = page.locator('#errorMessage');
    await errorLocator.waitFor({ state: 'visible' });
    await expect(errorLocator).toContainText(/Password must be at least 8 characters long and contain uppercase, lowercase, and numbers/);
  });

});
