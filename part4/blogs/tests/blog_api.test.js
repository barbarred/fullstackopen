const { test, after, beforeEach, describe } = require('node:test')
const bcrypt = require('bcrypt')
const Blog = require('../models/blog.js')
const User = require('../models/users.js')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const list_helper = require('../utils/list_helper.js')

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

describe('Gets correct info', () => {
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
})

describe('Add entries in the blogs object', () => {
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
})

describe('Checking somes keys on Blogs', () => {
    test('check likes key in object blogs', async () => {
      const newEntrie = {
        title: "a one entrie without the likes key",
        author: "rorri",
        url: "https://github.com/barbarred"
      }
      
      await api
        .post('/api/blogs')
        .send(newEntrie)
        .expect(400)
    })

    test('check title & url keys in the blogs object', async () => {
      const newEntrie = {
        title: "a one entrie without the likes key",
        author: "rorri"
      }

      await api
        .post('/api/blogs')
        .send(newEntrie)
        .expect(400)
    })
})

describe('Delete and Update one entrie of the object blogs', () => {
  test('succeeds deletion with the status code 204', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    const entrieToDelete = blogs[0]

    await api
      .delete(`/api/blogs/${entrieToDelete.id}`)
      .expect(204)
  })
  test('The update is successful with status code 200', async () => {
    const updateEntrie = {
      title: "update a entrie",
      author: "barbarred",
      url: "https://github.com/barbarred",
      likes: 33
    }

    await api
      .put('/api/blogs/6674920364cf31d692ea2313')
      .send(updateEntrie)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({username: 'root', passwordHash})
    await user.save()
  })

  test('creation a a new user', async () => {
    const userAtStart = await list_helper.usersInDb()

    const newUser = {
      username: 'rorridev',
      name: 'Ricardo',
      password: '13081707'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const userAtEnd = await list_helper.usersInDb()
    assert.strictEqual(userAtEnd.length, userAtStart.length + 1)

    const usernames = userAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })
  test('creation not valid user', async () => {
  
    const newUser = {
      username: 'root',
      name: 'Ricardo',
      password: '13081707'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

})


after(async () => {
  await mongoose.connection.close()
})