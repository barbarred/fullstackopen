const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const User = require('../models/users.js')
const Blog = require('../models/blog.js')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if(authorization && authorization.startsWith('Bearer ')){
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.post('/', async (request, response) => {
  const body =  request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if(!decodedToken.id){
    return response.status(401).json({error: 'token invalid'})
  }
  const user = await User.findById(decodedToken.id)

  const blog =  new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })
  if(blog.likes){
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }else if(blog.likes && blog.url){
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  }else{
    response.status(400).json('somes keys are missing')
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const entrie = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedEntrie = await Blog.findByIdAndUpdate(request.params.id, entrie, {new: true})
  response.status(200).json(updatedEntrie)
})

blogsRouter.delete('/:id', async(request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})



module.exports = blogsRouter