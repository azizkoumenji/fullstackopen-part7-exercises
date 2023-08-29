import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  return (
    <Card isPressable className="blog">
      <CardHeader>
        <Link to={`/blogs/${blog.id}`}>
          <p className="text-lg font-medium">{blog.title}</p>
          <p className="block font-thin text-s">{blog.author}</p>
        </Link>
      </CardHeader>
      <CardFooter>
        <p>
          <span className="font-semibold text-default-400 text-small">
            {" "}
            {blog.likes}
          </span>
          <span className="text-default-400 text-small"> Likes </span>
          <span className="font-semibold text-default-400 text-small">
            {blog.comments.length}
          </span>
          <span className="text-default-400 text-small"> Comments </span>
        </p>
      </CardFooter>
    </Card>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
