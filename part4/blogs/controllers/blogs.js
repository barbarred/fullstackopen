const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware.js')
const Blog = require('../models/blog.js')
const User = require('../models/users.js')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body =  request.body

  const user = request.user

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

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  const user = request.user

  if(blog.user.toString() === user.id.toString()){
    await Blog.findByIdAndDelete(request.params.id)
  }else{
    return response.status(401).json('the token is not valid')
  }
  return response.status(201).json('Blog successfully deleted')
})

module.exports = blogsRouter