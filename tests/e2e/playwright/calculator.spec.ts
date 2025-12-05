import { test, expect } from "@playwright/test";

test("Calculator performs addition for authenticated user", async ({ page }) => {
  // Step 1: login
  await page.goto("http://localhost:8000/login");

  await page.fill("#username", "existing_user");
  await page.fill("#password", "SecurePass123!");
  await page.click("button[type=submit]");

  // Verify login success
  await expect(page).toHaveURL(/.*calculations/);

  // Step 2: use calculator
  await page.fill("#input1", "10");
  await page.fill("#input2", "5");
  await page.selectOption("#calculation_type", "addition");

  await page.click("#submitCalculation");

  // Step 3: verify result appears in DOM
  await expect(page.locator("#calcResult")).toHaveText("15");
});
