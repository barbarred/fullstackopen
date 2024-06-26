const logger = require('../utils/logger.js')
const User = require('../models/users.js')

const dummy = (blogs) => {
  if(blogs.length > 1){
    return 1
  }else{
    return 1
  }
}

const totalLikes = (blogs) => {

  if(blogs.length === 1){
    let sumOfLikes = blogs[0].likes
    return sumOfLikes
  }else{
    let sumOfLikes = blogs.reduce((sum, blog) => sum + blog.likes, 0)
    return sumOfLikes
  }
}

const favoriteBlog = (blogs) => {
  if(blogs.length === 0) return []

  let moreLikes = blogs[0]

  for(let i = 1; i < blogs.length; i++){
    if(blogs[i].likes > moreLikes.likes){
      moreLikes = blogs[i]
    }
  }
  return {
    title: moreLikes.title,
    author: moreLikes.author,
    likes: moreLikes.likes
  }
}

const mostBlogs = (blogs) => {
  const countAuthorBlog = blogs.reduce((act, blog) => {
    act[blog.author] = (act[blog.author] || 0) + 1
    return act
  }, {})

  const authorWithMostBlogs = Object.keys(countAuthorBlog).reduce((a, b) => {
    return countAuthorBlog[a] > countAuthorBlog[b] ? a : b
  })

  return {
    author: authorWithMostBlogs,
    blogs: countAuthorBlog[authorWithMostBlogs]
  }

}

const mostLikes = (blogs) => {
  const likesCount = blogs.reduce((act, blog) => {
    act[blog.author] = (act[blog.author] || 0) + blog.likes
    return act
  }, {})
  const authorWithMoreLikes = Object.keys(likesCount).reduce((a, b) => {
    return likesCount[a] > likesCount[b] ? a : b
  })

  return {
    author: authorWithMoreLikes,
    likes: likesCount[authorWithMoreLikes]
  }
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  usersInDb
}