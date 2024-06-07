const logger = require('../utils/logger.js')

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
  return(moreLikes.likes)

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}