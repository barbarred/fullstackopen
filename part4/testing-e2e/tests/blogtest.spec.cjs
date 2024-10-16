const { test, expect, beforeEach, describe } = require('@playwright/test')

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
      await page.getByTestId('username').fill('rorritest')
      await page.getByTestId('password').fill('13081707')
      await page.getByRole('button', {name: 'login'}).click()

      await expect(page.getByText('Ricardo logged in')).toBeVisible()
    })
    test('fails with wrong credentials', async ({page}) => {
      await page.getByTestId('username').fill('rorritest')
      await page.getByTestId('password').fill('wrong')
      await page.getByRole('button', {name: 'login'}).click()

      await expect(page.getByText('Wrong username or password')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach( async ({ page }) => {
      await page.getByTestId('username').fill('rorritest')
      await page.getByTestId('password').fill('13081707')
      await page.getByRole('button', {name: 'login'}).click()
    })
    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', {name: 'new note'}).click()
      await page.getByTestId('title').fill('one entrie with playwright')
      await page.getByTestId('author').fill('rorridev')
      await page.getByTestId('url').fill('http://github.com/barbarred')
      await page.getByTestId('likes').fill('33')
      await page.getByRole('button', {name: 'create'}).click()
      await expect(page.getByText('one entrie with playwright by rorridev')).toBeVisible()
    })
    test('Blog can be edited', async ({ page }) => {
      await page.getByRole('button', {name: 'new note'}).click()
      await page.getByTestId('title').fill('one entrie with playwright')
      await page.getByTestId('author').fill('rorridev')
      await page.getByTestId('url').fill('http://github.com/barbarred')
      await page.getByTestId('likes').fill('33')
      await page.getByRole('button', {name: 'create'}).click()
      await page.getByRole('button', {name: 'view'}).click()
      await page.getByRole('button', {name: 'like'}).click()
      await expect(page.getByText('likes 34')).toBeVisible()
    })
    test('Blog can be deleted', async ({ page }) => {
      await page.getByRole('button', {name: 'new note'}).click()
      await page.getByTestId('title').fill('one entrie with playwright')
      await page.getByTestId('author').fill('rorridev')
      await page.getByTestId('url').fill('http://github.com/barbarred')
      await page.getByTestId('likes').fill('33')
      await page.getByRole('button', {name: 'create'}).click()
      await page.getByRole('button', {name: 'view'}).click()
      await page.getByRole('button', {name: 'remove'}).click()
      page.on('dialog', dialog => dialog.accept())
      await expect(page.getByText('one entrie with playwright by rorridev')).not.toBeVisible()
    })
  })

})