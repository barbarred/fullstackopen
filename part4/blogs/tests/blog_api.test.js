const { test, after, beforeEach, describe } = require('node:test')
const bcrypt = require('bcrypt')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const list_helper = require('../utils/list_helper.js')
const User = require('../models/users.js')
const Blogtest = require('../models/blog.js')

const api = supertest(app)

const initialEntries = [
  {
    title: "first entrie for test",
    author: "rorri",
    url: "https://github.com/barbarred",
    likes: 33
  }
]

beforeEach( async () => {
  await Blogtest.deleteMany({})
  let entrieObject = new Blogtest(initialEntries[0])
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
    author: "Testingname",
    url: "https://github.com/barbarred",
    likes: 22,
    user: {
      username: "userTest",
      name: "Testingname",
      id: "66abeb8fd5b66f84b115bcb9"
    }
  }

  await api
    .post('/api/blogs')
    .auth(`${process.env.TOKENTEST}`, {type:'bearer'})
    .send(newEntrie)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialEntries.length + 1)
})

  test('entrie without toke', async () => {
    const entrieWithoutTkn = {
    title: "new entrie created to POST method",
    author: "Testingname",
    url: "https://github.com/barbarred",
    likes: 22,
    user: {
      username: "userTest",
      name: "Testingname",
      id: "66abeb8fd5b66f84b115bcb9"
    }
  }

  await api
    .post('/api/blogs')
    .send(entrieWithoutTkn)
    .expect(401)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialEntries.length)
  })
})

describe('Checking somes keys on Blogs', () => {
    test('check likes key in object blogs', async () => {
      const newEntrie = {
        title: "a one entrie without the likes key",
        author: "root",
        url: "https://github.com/barbarred",
        user: {
          username: "userTest",
          name: "Testingname",
          id: "66abeb8fd5b66f84b115bcb9"
        }
      }
      
      await api
        .post('/api/blogs')
        .set('Authorization' ,`Bearer ${process.env.TOKENTEST}`)
        .send(newEntrie)
        .expect(400)
    })

    test('check title & url keys in the blogs object', async () => {
      const newEntrie = {
        title: "a one entrie without the likes key",
        author: "rorri",
        user: {
          username: "userTest",
          name: "Testingname",
          id: "66abeb8fd5b66f84b115bcb9"
        }
      }

      await api
        .post('/api/blogs')
        .set('Authorization' ,`Bearer ${process.env.TOKENTEST}`)
        .send(newEntrie)
        .expect(400)
    })
})

describe('Delete and Update one entrie of the object blogs', () => {
  test('succeeds deletion with the status code 204', async () => {

  const response = await api.get('/api/blogs')
  const blogs = response.body
  const entrieToDelete = blogs[0]

  console.log(entrieToDelete)

  await api
    .delete(`/api/blogs/${entrieToDelete.id}`)
    .set('Authorization' ,`Bearer ${process.env.TOKENTEST}`)
    .expect(204)

  })

  test('The update is successful with status code 200', async () => {
    const updateEntrie = {
      title: "update a entrie",
      author: "root",
      url: "https://github.com/barbarred",
      likes: 33,
      user: {
        username: "userTest",
        name: "Testingname",
        id: "66abeb8fd5b66f84b115bcb9"
      }
    }

    await api
      .put('/api/blogs/66a96fb518aa907088d90a47')
      .set('Authorization' ,`Bearer ${process.env.TOKENTEST}`)
      .send(updateEntrie)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({ username: { $nin:["userTest"] } })
    const password = "13081707"
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
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