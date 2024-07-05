const errorHandler = (error, request, response, next) => {
  if(error.message.includes('Cannot read properties of undefined')){
    return response.status(400).json({error: 'some fields are missing' })
  }else if(error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')){
    return response.status(400).json({error: 'expected username to be unique'})
  }
  next(error)
}

module.exports = {
  errorHandler
}