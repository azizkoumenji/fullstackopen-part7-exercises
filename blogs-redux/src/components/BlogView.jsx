import { useDispatch, useSelector } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { deleteBlog, initializeBlogs } from "../reducers/blogReducer";
import blogService from "../services/blogs";
import { useState } from "react";
import { createComment } from "../reducers/commentReducer";
import { Input, Button, Card, CardBody } from "@nextui-org/react";

const BlogView = ({ handleLike }) => {
  const comment = useSelector((state) => state.comment);
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const match = useMatch("/blogs/:id");
  const navigate = useNavigate();

  const blog = match ? blogs.find((bl) => bl.id === match.params.id) : null;

  const handelDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog));
      navigate("/");
    }
  };

  const handleComment = (event) => {
    const newBlog = {
      ...blog,
      comments: blog.comments.concat(comment),
    };
    blogService.addComment(newBlog);
    dispatch(createComment(""));
  };

  const handleCommentChange = (event) => {
    dispatch(createComment(event.target.value));
  };

  if (!blog) {
    return null;
  } else {
    const showDeleteButton = user.id === blog.user.id;

    return (
      <div>
        <h2 className="text-4xl font-bold">
          {blog.title} by {blog.author}
        </h2>
        <a
          className="text-blue-500	hover:text-blue-600	"
          href={blog.url}
          target="_blank"
          rel="noreferrer"
        >
          {blog.url}
        </a>
        <p>
          <Button color="primary" onClick={() => handleLike(blog)}>
            Like {blog.likes}
          </Button>
        </p>
        {showDeleteButton && (
          <Button color="danger" onClick={handelDelete}>
            Delete
          </Button>
        )}
        <p>Added by {blog.user.name}</p>
        <p className="font-semibold text-lg">Comments</p>
        <ul>
          {blog.comments.map((comment, i) => (
            <li key={i}>
              <Card>
                <CardBody>{comment}</CardBody>
              </Card>
            </li>
          ))}
        </ul>
        <form onSubmit={handleComment}>
          <label>
            Add a comment:
            <Input value={comment} onChange={handleCommentChange} />
          </label>
          <Button color="success" type="submit">
            Add
          </Button>
        </form>
      </div>
    );
  }
};

BlogView.propTypes = {
  handleLike: PropTypes.func.isRequired,
};

export default BlogView;
