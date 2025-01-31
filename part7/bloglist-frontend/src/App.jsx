import { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Form, Button, Badge } from 'react-bootstrap';
import BlogForm from './components/note-form';
import Blog from './components/Blog';
import BlogDetails from './components/BlogDetails';
import UserDetails from './components/UsersDetails';
import './styles.css';
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
  addComment,
  deletePost,
} from './reducers/blogsReducer';
import { saveUser } from './reducers/userReducer';
import { setUser, closeSession } from './reducers/userReducer';
import { useParams, useNavigate } from 'react-router-dom';

const HomeViwe = ({ user, loginForm, blogsForm }) => {
  return <>{user === null ? loginForm() : blogsForm()}</>;
};

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const blogFormRef = useRef();
  const dispatch = useDispatch();
  const id = useParams().id;
  const navigate = useNavigate();

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
  const setComment = async (id, comment) => {
    dispatch(addComment(id, comment));
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
    navigate('/');
  };

  const loginForm = () => (
    <Form onSubmit={handleLogin} data-testid="loginForm" className="login-form">
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          data-testid="username"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          data-testid="password"
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login{' '}
      </Button>
    </Form>
  );

  const blogsForm = () => {
    return (
      <div>
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
      <div className="container mt-5 main-container">
        <SuccessNotification />
        <ErrorLogin />
        <RemoveNotification />
        <div className="nav-bar-container mb-5">
          <div className="nav-bar">
            <div className="logo">
              <h2>BlogsApp</h2>
            </div>
            <div className="nav-links">
              <p>
                <Link to="/users">Users</Link>
              </p>
              <p>
                <Link to="/">Blogs</Link>
              </p>
            </div>
            <div className="user-info">
              {user ? (
                <p>
                  <Badge bg="warning" className="userbadge">
                    {user.username}
                  </Badge>{' '}
                  logged in{' '}
                  <Button variant="outline-danger" onClick={closeLogin}>
                    logout
                  </Button>
                </p>
              ) : null}
            </div>
          </div>
        </div>
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
          <Route
            path="/blogs/:id"
            element={
              <BlogDetails
                user={user}
                blogs={sortedBlogs}
                updatePost={updateLikes}
                deletePost={deleteEntrie}
                setComm={setComment}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
