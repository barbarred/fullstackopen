const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createEntrie } = require('./helper')

describe('Blog app', () => {
  beforeEach(async({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
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
      await loginWith(page, 'rorritest', '13081707')
      await expect(page.getByText('Ricardo logged in')).toBeVisible()
    })
    test('fails with wrong credentials', async ({page}) => {
      await loginWith(page, 'rorritest', 'wrong')
      await expect(page.getByText('Wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    test('a new blog can be created', async ({ page }) => {
      await loginWith(page, 'rorritest', '13081707')
      await createEntrie(page, 'entrie with playwright', 'rorritest', 'http://github.com/barbarred', '33')
      await expect(page.getByText('entrie with playwright by rorritest')).toBeVisible()
    })
    test('Blog can be edited', async ({ page }) => {
      await loginWith(page, 'rorritest', '13081707')
      await createEntrie(page, 'entrie with playwright', 'rorritest', 'http://github.com/barbarred', '33')
      await page.getByRole('button', {name: 'view'}).click()
      await page.getByRole('button', {name: 'like'}).click()
      await expect(page.getByText('likes 34')).toBeVisible()
    })
    test('Blog can be deleted', async ({ page }) => {
      await loginWith(page, 'rorritest', '13081707')
      await createEntrie(page, 'entrie with playwright', 'rorritest', 'http://github.com/barbarred', '33')
      await page.getByRole('button', {name: 'view'}).click()
      page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('remove')
        expect(dialog.message()).toContain('Remove una nota by rorritest')
        await dialog.accept()
      })
    })
  })

})