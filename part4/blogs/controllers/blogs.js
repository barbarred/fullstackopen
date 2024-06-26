const blogsRouter = require('express').Router()
const Blog = require('../models/blog.js')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body =  request.body

  const blog =  new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })
  if(blog.likes){
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }else if(blog.likes && blog.url){
    const savedBlog = await blog.save()
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