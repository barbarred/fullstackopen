import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';

const BlogDetails = ({ blogs, updatePost, deletePost, user, setComm }) => {
  const [viewBtn, setViewBtn] = useState(false);
  const id = useParams().id;
  const blog = blogs.find((blog) => blog.id === id);
  const navigate = useNavigate();
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (user?.username === blog?.user.username) {
      setViewBtn(true);
    }
  }, []);

  const updateLikes = (event) => {
    event.preventDefault();
    updatePost({
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id_post: blog.id,
    });
  };
  const handleDelete = (event) => {
    event.preventDefault();
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      deletePost({
        idToRemove: blog.id,
      });
    }
    navigate('/');
  };

  const handleAddComment = (event) => {
    event.preventDefault();
    setComm(id, comment);
    setComment('');
  };
  return (
    <>
      <section>
        <Card className="text-center">
          <Card.Header>
            <h3>{blog?.title}</h3>
          </Card.Header>
          <Card.Body>
            <Card.Title>
              <p>{blog?.url}</p>
            </Card.Title>
            <p>
              {blog?.likes}{' '}
              <Button variant="success" size="sm" onClick={updateLikes}>
                Like
              </Button>
            </p>
          </Card.Body>
          <Card.Footer className="text-muted">
            <p>added by {blog?.user.username}</p>
          </Card.Footer>
        </Card>
        <Card className="mt-4">
          <Card.Header className="text-center">
            {' '}
            <h3>Comments</h3>{' '}
          </Card.Header>
          <Card.Body>
            <blockquote className="blockquote mb-0">
              {blog?.comments.map((comment, index) => (
                <footer key={index} className="blockquote-footer">
                  {typeof comment === 'object' ? comment.text : comment}
                </footer>
              ))}
            </blockquote>
            <input
              className="mt-4"
              type="text"
              onChange={(event) => setComment(event.target.value)}
            />
            <form onSubmit={handleAddComment} className="mt-2">
              <Button variant="secondary" type="submit" size="sm">
                add comment
              </Button>
            </form>
            <div>
              {viewBtn ? (
                <button onClick={handleDelete} data-testid="removeBtn">
                  remove
                </button>
              ) : (
                ''
              )}
            </div>
          </Card.Body>
        </Card>
      </section>
    </>
  );
};

export default BlogDetails;
