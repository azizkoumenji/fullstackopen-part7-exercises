import { useDispatch, useSelector } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { deleteBlog } from "../reducers/blogReducer";

const BlogView = ({ handleLike }) => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const match = useMatch("/blogs/:id");
  const navigate = useNavigate();

  const blog = match ? blogs.find((bl) => bl.id === match.params.id) : null;

  const showDeleteButton = user.id === blog.user.id;

  const handelDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog));
      navigate("/");
    }
  };

  return (
    <div>
      <h2>
        {blog.title} by {blog.author}
      </h2>
      <a href={blog.url} target="_blank" rel="noreferrer">
        {blog.url}
      </a>
      <p>
        Likes: {blog.likes}{" "}
        <button onClick={() => handleLike(blog)}>Like</button>
      </p>
      <p>Added by {blog.user.name}</p>
      {showDeleteButton && <button onClick={handelDelete}>Delete</button>}
    </div>
  );
};

BlogView.propTypes = {
  handleLike: PropTypes.func.isRequired,
};

export default BlogView;
