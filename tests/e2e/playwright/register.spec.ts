import { test, expect } from '@playwright/test';

test.describe('User Registration', () => {
  const baseUrl = 'http://localhost:8000/register';

  // ----------------------------
  // Positive Test
  // ----------------------------
  test('user can register successfully', async ({ page }) => {
    await page.goto(baseUrl);

    await page.fill('#username', `testuser${Date.now()}`);
    await page.fill('#email', `testuser${Date.now()}@example.com`);
    await page.fill('#first_name', 'Test');
    await page.fill('#last_name', 'User');
    await page.fill('#password', 'SecurePass123!');
    await page.fill('#confirm_password', 'SecurePass123!');

    await page.click('button:text("Register")');

    // Wait for success message
    await expect(page.locator('#successMessage')).toHaveText(/Registration successful/);

    // Optional: check redirect to login
    await page.waitForURL('**/login');
  });

  // ----------------------------
  // Negative Tests
  // ----------------------------
  test('shows error if username too short', async ({ page }) => {
    await page.goto(baseUrl);

    await page.fill('#username', 'ab');
    await page.fill('#email', 'test@example.com');
    await page.fill('#first_name', 'Test');
    await page.fill('#last_name', 'User');
    await page.fill('#password', 'SecurePass123!');
    await page.fill('#confirm_password', 'SecurePass123!');

    await page.click('button:text("Register")');

    await expect(page.locator('#errorMessage')).toHaveText(/Username must be at least/);
  });

  test('shows error if passwords do not match', async ({ page }) => {
    await page.goto(baseUrl);

    await page.fill('#username', `user${Date.now()}`);
    await page.fill('#email', `user${Date.now()}@example.com`);
    await page.fill('#first_name', 'Test');
    await page.fill('#last_name', 'User');
    await page.fill('#password', 'SecurePass123!');
    await page.fill('#confirm_password', 'WrongPass123!');

    await page.click('button:text("Register")');

    await expect(page.locator('#errorMessage')).toHaveText(/Passwords do not match/);
  });

  test('shows error if email is invalid', async ({ page }) => {
    await page.goto(baseUrl);

    await page.fill('#username', `user${Date.now()}`);
    await page.fill('#email', 'invalid-email');
    await page.fill('#first_name', 'Test');
    await page.fill('#last_name', 'User');
    await page.fill('#password', 'SecurePass123!');
    await page.fill('#confirm_password', 'SecurePass123!');

    await page.click('button:text("Register")');

    await expect(page.locator('#errorMessage')).toHaveText(/valid email/);
  });

  test('shows error if username/email already exists', async ({ page }) => {
    const username = `existinguser${Date.now()}`;
    const email = `existinguser${Date.now()}@example.com`;

    // First, register successfully
    await page.goto(baseUrl);
    await page.fill('#username', username);
    await page.fill('#email', email);
    await page.fill('#first_name', 'Test');
    await page.fill('#last_name', 'User');
    await page.fill('#password', 'SecurePass123!');
    await page.fill('#confirm_password', 'SecurePass123!');
    await page.click('button:text("Register")');
    await page.waitForURL('**/login');

    // Try registering the same username/email again
    await page.goto(baseUrl);
    await page.fill('#username', username);
    await page.fill('#email', email);
    await page.fill('#first_name', 'Test');
    await page.fill('#last_name', 'User');
    await page.fill('#password', 'SecurePass123!');
    await page.fill('#confirm_password', 'SecurePass123!');
    await page.click('button:text("Register")');

    await expect(page.locator('#errorMessage')).toHaveText(/Username or email already exists/);
  });
});