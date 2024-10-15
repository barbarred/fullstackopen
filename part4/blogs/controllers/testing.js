const testingRouter = require('express').Router()

const Blog = require('../models/blog.js')
const User = require('../models/users.js')

testingRouter.post('/reset', async (request, response) => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    response.status(204).end()
})

module.exports = testingRouter