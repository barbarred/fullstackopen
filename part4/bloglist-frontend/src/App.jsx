import { useState, useEffect } from 'react'
import loginService from './services/login'
import Blog from './components/Blog'
import blogService from './services/blogs'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
      setUser(user)
      setUsername('')
      setPassword('')
    }catch (exception){
      setErrorMessage('Wrong Credentials')
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

  const loginForm = () => {
    
    return (
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
  }

  const blogsForm = () => {
    return(
      <div>
        <p>{user.name} logged in <button onClick={closeLogin}>logout</button> </p>
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>

    
      { user === null
        ? loginForm()
        : blogsForm() 
      }

  
    </div>
  )
}

export default App