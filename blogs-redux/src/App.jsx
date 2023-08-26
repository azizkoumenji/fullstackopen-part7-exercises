import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Login from "./components/Login";
import Add from "./components/Add";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { setNotification } from "./reducers/notificationReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotification("Wrong username or password", 5));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const blogFormRef = useRef();

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    await blogService.create(blogObject);
    setBlogs(await blogService.getAll());
    dispatch(
      setNotification(
        `A new blog "${blogObject.title}" by ${blogObject.author} has been added`,
        5
      )
    );
  };

  function compareNumbers(a, b) {
    return b.likes - a.likes;
  }

  const handleLike = async (blog) => {
    const newBlog = { ...blog, likes: blog.likes + 1 };
    await blogService.modify(newBlog);
    setBlogs(await blogService.getAll());
  };

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
    return (
      <div>
        <h2>Blogs</h2>
        <Notification />
        <p>{user.name} is logged in.</p>
        <button onClick={handleLogout}>Log Out</button>
        <Togglable buttonLabel="New Blog" ref={blogFormRef}>
          <Add addBlog={addBlog} />
        </Togglable>
        {blogs.sort(compareNumbers).map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            handleLike={handleLike}
            setBlogs={setBlogs}
          />
        ))}
      </div>
    );
  }
};

export default App;
