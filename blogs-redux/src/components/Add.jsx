import PropTypes from "prop-types";
import { useState } from "react";
import { CardHeader, Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

const Add = ({ addBlog }) => {
  const [newAuthor, setNewAuthor] = useState("");
  const [newURL, setNewURL] = useState("");
  const [newTitle, setNewTitle] = useState("");

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleURLChange = (event) => {
    setNewURL(event.target.value);
  };

  const newBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newURL,
    };
    addBlog(blogObject);
    setNewTitle("");
    setNewURL("");
    setNewAuthor("");
  };

  return (
    <>
      <p className="text-xl font-semibold mb-5">Create New</p>
      <form onSubmit={newBlog} className="flex flex-col gap-2 mb-3">
        <Input
          value={newTitle}
          label="Title"
          id="title"
          onChange={handleTitleChange}
        />
        <Input
          value={newAuthor}
          label="Author"
          id="author"
          onChange={handleAuthorChange}
        />
        <Input value={newURL} label="URL" id="url" onChange={handleURLChange} />
        <Button color="primary" type="submit">
          Save
        </Button>
      </form>
    </>
  );
};

Add.propTypes = {
  addBlog: PropTypes.func.isRequired,
};

export default Add;
