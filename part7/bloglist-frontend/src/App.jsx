import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BlogForm from './components/note-form';
import Blog from './components/Blog';
import UserDetails from './components/UsersDetails';
import blogService from './services/blogs';
import userService from './services/users';
import {
  SuccessNotification,
  ErrorLogin,
  RemoveNotification,
} from './components/Notifications';
import Togglable from './components/togglable';
import User from './components/User';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSuccessMessage,
  setError,
  setErrorRemove,
  clearNotification,
} from './reducers/notificationReducer';
import {
  initializeBlogs,
  createBlog,
  updatePost,
  deletePost,
} from './reducers/blogsReducer';
import { saveUser } from './reducers/userReducer';
import { setUser, closeSession } from './reducers/userReducer';
import { useParams } from 'react-router-dom';

const HomeViwe = ({ user, loginForm, blogsForm }) => {
  return (
    <>
      <h2>blogs</h2>
      {user === null ? loginForm() : blogsForm()}
    </>
  );
};

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const blogFormRef = useRef();
  const dispatch = useDispatch();
  const id = useParams().id;

  const user = useSelector((state) => {
    return state.user;
  });

  const blogs = useSelector((state) => {
    return state.blogs;
  });

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    userService.getUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      dispatch(setUser(user));
    }
  }, []);

  const addBlog = async (blogObject) => {
    const titleBlog = blogObject.title;
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(blogObject));
    dispatch(
      setSuccessMessage(`a new blog '${titleBlog}' by ${user.name} added`)
    );
    setTimeout(() => {
      dispatch(clearNotification());
    }, 3000);
    dispatch(initializeBlogs());
  };

  const updateLikes = async (postUpdated) => {
    const id = postUpdated.id_post;
    dispatch(updatePost(postUpdated, id));
  };

  const deleteEntrie = async (removePost) => {
    const idPost = removePost.idToRemove;
    dispatch(deletePost(idPost));
    dispatch(setErrorRemove('Post removed successfully'));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 3000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    if (username === '' || password === '') {
      dispatch(setError('Username or password is missing'));
      setTimeout(() => {
        dispatch(clearNotification());
      }, 3000);
    } else {
      dispatch(saveUser({ username, password }));
      dispatch(setSuccessMessage('Login successful'));
      setTimeout(() => {
        dispatch(clearNotification());
      }, 3000);
    }
  };

  const closeLogin = () => {
    window.localStorage.clear();
    dispatch(closeSession());
    setUsername('');
    setPassword('');
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
    if (!user) return null;
    return (
      <div>
        <p>
          {user.username} logged in <button onClick={closeLogin}>logout</button>
        </p>
        <Togglable buttonLabel="new note" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            updatePost={updateLikes}
            deletePost={deleteEntrie}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      <div>
        <SuccessNotification />
        <ErrorLogin />
        <RemoveNotification />
      </div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <HomeViwe
                user={user}
                loginForm={loginForm}
                blogsForm={blogsForm}
              />
            }
          />
          <Route path="/users" element={<UserDetails users={users} />} />
          <Route
            path="/users/:id"
            element={<User users={users} blogs={sortedBlogs} />}
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
