import { useState, useEffect, useRef } from 'react'
import loginService from './services/login'
import BlogForm from './components/note-form'
import Blog from './components/Blog'
import blogService from './services/blogs'
import SuccessNotification from './components/SuccessNotifications'
import ErrorLogin from './components/ErrorNotification'
import Togglable from './components/togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>{
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs( sortedBlogs )
    })  
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setSuccessMessage(`a new blog You're NOT gonna need it! by ${user.name} added`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 3000)
      })
  }

  const updatePost = (postUpdated) => {
    const id = postUpdated.id_post
    blogService
      .updateLikes(postUpdated, id)
  }

  const deletePost = (removePost) => {
    const idPost = removePost.idToRemove
    blogService
      .deletePost(idPost)
  }

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

  const blogsForm = () => {

    return(
      <div>
        <p>{user.name} logged in <button onClick={closeLogin}>logout</button></p>
        <Togglable buttonLabel='new note' ref={blogFormRef}>
          <BlogForm 
            createBlog={addBlog}
          />
        </Togglable>
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updatePost={updatePost} deletePost={deletePost}/>
      )}
    </div>
    )
  }
  
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