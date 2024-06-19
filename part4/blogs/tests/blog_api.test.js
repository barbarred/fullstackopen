const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog.js')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const initialEntries = [
  {
    title: "first entrie for test",
    author: "rorri",
    url: "https://github.com/barbarred",
    likes: 33
  },
  {
    title: "another entrie for testing",
    author: "rorridev",
    url: "https://github.com/barbarred",
    likes: 23
  }
]

beforeEach( async () => {
  await Blog.deleteMany({})
  let entrieObject = new Blog(initialEntries[0])
  await entrieObject.save()
  entrieObject = new Blog(initialEntries[1])
  await entrieObject.save()
})

test('correct json entries format', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  assert.strictEqual(response.body.length, initialEntries.length)
})

test('correct id name', async () => {

  const response = await api.get('/api/blogs')
  const blogs = response.body
  const checkIdName = blogs[0].id ? 'id' : false
  
  assert.strictEqual(checkIdName, 'id')
})

test('one entrie created succesfully', async () => {

  const newEntrie = {
    title: "new entrie created to POST method",
    author: "barbarred",
    url: "https://github.com/barbarred",
    likes: 22
  }

  await api
    .post('/api/blogs')
    .send(newEntrie)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialEntries.length + 1)

})

after(async () => {
  await mongoose.connection.close()
})