const { test, after } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('correct json entries format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('entries blogs in json format', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, 2)
})

test('correct id name', async () => {

  const response = await api.get('/api/blogs')
  const blogs = response.body
  const checkIdName = blogs[0].id ? 'id' : false
  
  assert.strictEqual(checkIdName, 'id')
})

after(async () => {
  await mongoose.connection.close()
})