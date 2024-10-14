const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is show', async ({ page }) => {
    const loginForm = page.getByTestId('loginForm')
    await expect(loginForm).toBeVisible()
  })
})