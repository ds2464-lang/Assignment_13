import { test, expect, Page } from '@playwright/test';

test.describe('User Login', () => {
  const baseUrl = 'http://localhost:8000/login';

  // Helper: generate a unique user for testing
  async function registerTestUser(page: Page) {
    const username = `user${Date.now()}`;
    const email = `user${Date.now()}@example.com`;
    await page.goto('http://localhost:8000/register');
    await page.fill('#username', username);
    await page.fill('#email', email);
    await page.fill('#first_name', 'Test');
    await page.fill('#last_name', 'User');
    await page.fill('#password', 'SecurePass123!');
    await page.fill('#confirm_password', 'SecurePass123!');
    await page.click('button:text("Register")');
    await page.waitForURL('**/login');
    return { username, email, password: 'SecurePass123!' };
  }

  // ----------------------------
  // Positive Test
  // ----------------------------
  test('user can login successfully', async ({ page }) => {
    const user = await registerTestUser(page);

    await page.goto(baseUrl);
    await page.fill('#username', user.username);
    await page.fill('#password', user.password);
    await page.click('button:text("Sign in")');

    // Wait for success message and redirect
    await expect(page.locator('#successMessage')).toHaveText(/Login successful/);
    await page.waitForURL('**/dashboard');
  });

  // ----------------------------
  // Negative Tests
  // ----------------------------
  test('shows error on wrong password', async ({ page }) => {
    const user = await registerTestUser(page);

    await page.goto(baseUrl);
    await page.fill('#username', user.username);
    await page.fill('#password', 'WrongPassword!');
    await page.click('button:text("Sign in")');

    await expect(page.locator('#errorMessage')).toHaveText(/Invalid username or password/);
  });

  test('shows error on non-existent username', async ({ page }) => {
    await page.goto(baseUrl);
    await page.fill('#username', 'nonexistentuser');
    await page.fill('#password', 'SomePassword123!');
    await page.click('button:text("Sign in")');

    await expect(page.locator('#errorMessage')).toHaveText(/Invalid username or password/);
  });

  test('shows error when fields are empty', async ({ page }) => {
    await page.goto(baseUrl);
    await page.fill('#username', '');
    await page.fill('#password', '');
    await page.click('button:text("Sign in")');

    await expect(page.locator('#errorMessage')).toHaveText(/Please fill in all fields/);
  });
});