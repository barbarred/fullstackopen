const { test, expect, beforeEach, describe } = require('@playwright/test')
const { request } = require('http')

describe('Blog app', () => {
  beforeEach(async({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await request.post('http://localhost:3001/api/users', {
      data: {
        username: 'rorritest',
        name: 'Ricardo',
        password: '13081707'
      }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is show', async ({ page }) => {
    const loginForm = page.getByTestId('loginForm')
    await expect(loginForm).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({page}) => {

    })
    test('fails with wrong credentials', async ({page}) => {
      
    })
  })
})