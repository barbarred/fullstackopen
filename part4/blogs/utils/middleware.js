const errorHandler = (error, request, response, next) => {
  if(error.message.includes('Cannot read properties of undefined')){
    return response.status(400).json({error: 'some fields are missing' })
  }else if(error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')){
    return response.status(400).json({error: 'expected username to be unique'})
  }else if(error.name === 'JsonWebTokenError'){
    return response.status(401).json({error: 'Token Invalid'})
  }
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')){
    request.token = authorization.replace('Bearer ', '')
  }
  next()
}

module.exports = {
  errorHandler,
  tokenExtractor
}