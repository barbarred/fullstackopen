import { useState, useEffect, useRef } from 'react';
import loginService from './services/login';
import BlogForm from './components/note-form';
import Blog from './components/Blog';
import blogService from './services/blogs';
import {
  SuccessNotification,
  ErrorLogin,
  RemoveNotification,
} from './components/Notifications';
import Togglable from './components/togglable';
import { useDispatch } from 'react-redux';
import {
  setSuccessMessage,
  setError,
  setErrorRemove,
  clearNotification,
} from './reducers/notificationReducer';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const addBlog = async (blogObject) => {
    const titleBlog = blogObject.title;
    blogFormRef.current.toggleVisibility();
    await blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      dispatch(
        setSuccessMessage(`a new blog '${titleBlog}' by ${user.name} added`)
      );
      setTimeout(() => {
        dispatch(clearNotification());
      }, 3000);
    });
    await blogService.getAll().then((blogs) => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
    });
  };

  const updatePost = async (postUpdated) => {
    const id = postUpdated.id_post;
    await blogService.updateLikes(postUpdated, id);
    await blogService.getAll().then((blogs) => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
    });
  };

  const deletePost = async (removePost) => {
    const idPost = removePost.idToRemove;
    await blogService.deletePost(idPost);
    await blogService.getAll().then((blogs) => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(sortedBlogs);
      dispatch(setErrorRemove('Post removed successfully'));
      setTimeout(() => {
        dispatch(clearNotification());
      }, 3000);
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      dispatch(setError('Wrong username or password'));
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
    }

    console.log('loggin in with', username, password);
  };

  const closeLogin = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin} data-testid="loginForm">
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          data-testid="username"
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          data-testid="password"
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );

  const blogsForm = () => {
    return (
      <div>
        <p>
          {user.name} logged in <button onClick={closeLogin}>logout</button>
        </p>
        <Togglable buttonLabel="new note" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            updatePost={updatePost}
            deletePost={deletePost}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <div>
        <h2>blogs</h2>
        <SuccessNotification />
        <ErrorLogin />
        <RemoveNotification />
        {user === null ? loginForm() : blogsForm()}
      </div>
    </>
  );
};

export default App;
