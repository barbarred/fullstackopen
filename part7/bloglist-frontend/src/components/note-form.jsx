import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [likes, setLikes] = useState('');

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
      likes: likes,
      comments: [],
    });
    setTitle('');
    setAuthor('');
    setUrl('');
    setLikes('');
  };

  return (
    <div>
      <h3>create new</h3>
      <Form onSubmit={addBlog} className="blogForm">
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            type="text"
            value={title}
            name="Title"
            onChange={(event) => setTitle(event.target.value)}
            className="title"
            data-testid="title"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>author:</Form.Label>
          <Form.Control
            type="text"
            value={author}
            name="Author"
            onChange={(event) => setAuthor(event.target.value)}
            className="author"
            data-testid="author"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>url:</Form.Label>
          <Form.Control
            type="url"
            value={url}
            name="Url"
            onChange={(event) => setUrl(event.target.value)}
            className="url"
            data-testid="url"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>likes:</Form.Label>
          <Form.Control
            type="num"
            value={likes}
            name="Likes"
            onChange={(event) => setLikes(event.target.value)}
            className="likes"
            data-testid="likes"
          />
        </Form.Group>
        <Button
          type="submit"
          variant="outline-primary"
          className="btn mt-3 mb-3"
        >
          create
        </Button>
      </Form>
    </div>
  );
};

export default BlogForm;
