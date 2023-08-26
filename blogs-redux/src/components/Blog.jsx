import PropTypes from "prop-types";
import { useState } from "react";
import { deleteBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";

const Blog = ({ blog, user, handleLike }) => {
  const [showAll, setShow] = useState(false);
  const dispatch = useDispatch();

  const handleClick = () => {
    const change = !showAll;
    setShow(change);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const showDeleteButton = user.id === blog.user.id;

  const handelDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog));
    }
  };

  if (showAll) {
    return (
      <div style={blogStyle} className="blog">
        <p>
          {blog.title} {blog.author}
        </p>
        <a href={blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </a>
        <p>
          Likes: {blog.likes}{" "}
          <button onClick={() => handleLike(blog)}>Like</button>
        </p>
        <p>{blog.user.name}</p>
        <button onClick={handleClick}>Hide</button>{" "}
        {showDeleteButton && <button onClick={handelDelete}>Delete</button>}
      </div>
    );
  } else {
    return (
      <div className="blog">
        {blog.title} {blog.author}
        <button onClick={handleClick}>View</button>
      </div>
    );
  }
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
};

export default Blog;
