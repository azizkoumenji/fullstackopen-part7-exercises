import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import Add from "./components/Add";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { setNotification } from "./reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import { addLike, createBlog, initializeBlogs } from "./reducers/blogReducer";
import { logUser, outUser, userAreadyLogged } from "./reducers/userReducer";
import Users from "./components/Users";
import { getUsers } from "./reducers/allUsers";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const userLogged = JSON.parse(loggedUserJSON);
      dispatch(userAreadyLogged(userLogged));
    }
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();

    dispatch(
      logUser({
        username,
        password,
      })
    );
    setUsername("");
    setPassword("");
  };

  const handleLogout = () => {
    dispatch(outUser());
  };

  const blogFormRef = useRef();

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(blogObject));
    dispatch(
      setNotification(
        `A new blog "${blogObject.title}" by ${blogObject.author} has been added`,
        5
      )
    );
  };

  const handleLike = async (blog) => {
    const newBlog = { ...blog, likes: blog.likes + 1 };
    dispatch(addLike(newBlog));
  };

  function compareNumbers(a, b) {
    return b.likes - a.likes;
  }

  if (user === null) {
    return (
      <>
        <Notification />
        <Login
          username={username}
          handleLogin={handleLogin}
          password={password}
          setPassword={setPassword}
          setUsername={setUsername}
        />
      </>
    );
  } else {
    const blogsSorted = [...blogs];
    return (
      <div>
        <h2>Blogs</h2>
        <Notification />
        <p>{user.name} is logged in.</p>
        <button onClick={handleLogout}>Log Out</button>
        <Togglable buttonLabel="New Blog" ref={blogFormRef}>
          <Add addBlog={addBlog} />
        </Togglable>
        {blogsSorted.sort(compareNumbers).map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} handleLike={handleLike} />
        ))}
        <Users />
      </div>
    );
  }
};

export default App;
