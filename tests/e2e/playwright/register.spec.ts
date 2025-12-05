import { test, expect } from "@playwright/test";

test("User registration flow works", async ({ page }) => {
  await page.goto("http://localhost:8000/register");

  await page.fill("#first_name", "Alice");
  await page.fill("#last_name", "Smith");
  await page.fill("#email", `alice${Date.now()}@example.com`);
  await page.fill("#username", `user${Date.now()}`);
  await page.fill("#password", "SecurePass123!");
  await page.fill("#confirm_password", "SecurePass123!");

  await page.click("button[type=submit]");

  // Expect a success message or redirect
  await expect(page.locator("#successMessage")).toBeVisible();
});
