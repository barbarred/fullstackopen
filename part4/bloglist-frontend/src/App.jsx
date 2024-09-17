import { useState, useEffect } from 'react'
import loginService from './services/login'
import Blog from './components/Blog'
import blogService from './services/blogs'
import SuccessNotification from './components/SuccessNotifications'
import ErrorLogin from './components/ErrorNotification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: likes
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
        setLikes('')
        setSuccessMessage(`a new blog You're NOT gonna need it! by ${author} added`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
      })
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch (exception){
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }

    console.log('loggin in with', username, password)
  }

  const closeLogin = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input 
            type="text"
            value={username}
            name='Username'
            onChange={( { target } ) => setUsername(target.value)}
           />
      </div>
      <div>
       password
        <input 
          type="password"
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>Login</button>
    </form>
  )

  const blogsForm = () => (
    <div>
        <p>{user.name} logged in <button onClick={closeLogin}>logout</button> </p>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
        <div>
          title
            <input 
            type="text" 
            value={title}
            name='Title'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
            <input 
              type="text" 
              value={author}
              name='Author'
              onChange={({ target }) => setAuthor(target.value)}
            />
        </div>
        <div>
          url
            <input 
              type="url" 
              value={url}
              name='Url'
              onChange={({ target }) => setUrl(target.value)}
            />
        </div>
        <div>
          likes
            <input 
              type="num" 
              value={likes}
              name='Likes'
              onChange={({ target }) => setLikes(target.value)}
            />
        </div>
        <button type='submit'>create</button>
        </form>
        
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>
  )
  
  return (
    <>
    <div>
      <h2>blogs</h2>
      <SuccessNotification text={successMessage} />
      <ErrorLogin text={errorMessage} />
      { user === null
        ? loginForm()
        : blogsForm()
      }

    </div>
    </>
  )
}

export default App