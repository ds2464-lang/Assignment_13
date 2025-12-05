import { test, expect } from '@playwright/test';

test.describe('User Login', () => {

  test('Positive: login with correct credentials', async ({ page }) => {
    await page.goto('http://localhost:8000/login');

    await page.fill('#username', 'testuser');
    await page.fill('#password', 'SecurePass123!');
    await page.click('button:text("Sign in")');

    const successLocator = page.locator('#successMessage');
    await successLocator.waitFor({ state: 'visible' });
    await expect(successLocator).toContainText(/Login successful/);

    // Optionally check token is stored in localStorage
    const token = await page.evaluate(() => localStorage.getItem('access_token'));
    expect(token).not.toBeNull();
  });

  test('Negative: login with wrong password', async ({ page }) => {
    await page.goto('http://localhost:8000/login');

    await page.fill('#username', 'testuser');
    await page.fill('#password', 'WrongPass123!');
    await page.click('button:text("Sign in")');

    const errorLocator = page.locator('#errorMessage');
    await errorLocator.waitFor({ state: 'visible' });
    await expect(errorLocator).toContainText(/Invalid username or password/);
  });
});
