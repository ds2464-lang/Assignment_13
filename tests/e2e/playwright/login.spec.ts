import { test, expect } from "@playwright/test";

test("User login flow works", async ({ page }) => {
  await page.goto("http://localhost:8000/login");

  await page.fill("#username", "existing_user");
  await page.fill("#password", "SecurePass123!");

  await page.click("button[type=submit]");

  // Expect redirect to dashboard or calculator
  await expect(page).toHaveURL(/.*dashboard|calculations/);
});
