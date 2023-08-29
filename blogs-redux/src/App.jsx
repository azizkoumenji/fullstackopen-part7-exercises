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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import User from "./components/User";
import BlogView from "./components/BlogView";
import NavBar from "./components/NavBar";

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
      <Router>
        <NavBar handleLogout={handleLogout} />
        <Notification />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <h2 className="text-5xl font-bold mb-50 mb-7 mx-5 text-center mt-5">
                  Posts
                </h2>
                <div className="flex flex-col gap-3 mx-5">
                  {blogsSorted.sort(compareNumbers).map((blog) => (
                    <Blog key={blog.id} blog={blog} />
                  ))}
                  <Togglable buttonLabel="New Blog" ref={blogFormRef}>
                    <Add addBlog={addBlog} />
                  </Togglable>
                </div>
              </>
            }
          />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route
            path="/blogs/:id"
            element={<BlogView handleLike={handleLike} />}
          />
        </Routes>
      </Router>
    );
  }
};

export default App;
