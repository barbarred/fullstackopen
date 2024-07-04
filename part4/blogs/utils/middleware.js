const errorHandler = (error, request, response, next) => {
  if(error.message.includes('Cannot read properties of undefined')){
    return response.status(400).json({error: 'a field is missing' })
  }else if(error.name === 'MongoServerError'){
    return response.status(400).json({error: 'there are some fields badly formatted'})
  }else if(error.message.includes('E11000 duplicate key error')){
    return response.status(400).json({error: 'expected username to be unique'})
  }
  next(error)
}

module.exports = {
  errorHandler
}