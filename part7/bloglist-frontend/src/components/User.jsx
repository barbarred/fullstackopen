import { useParams } from 'react-router-dom';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const User = ({ users, blogs }) => {
  const id = useParams().id;
  if (!users) return null;

  const user = users.find((user) => user.id === id);
  const userBlogs = blogs.filter(
    (blog) => blog.user.username === user.username
  );
  return (
    <>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{user?.username}</Card.Title>
        </Card.Body>
        <Card.Body>
          <Card.Text>added blogs:</Card.Text>
        </Card.Body>
        <ListGroup variant="flush">
          {userBlogs.length > 0 ? (
            userBlogs.map((blog) => (
              <ListGroup.Item key={blog.id} className="blog-list">
                {' '}
                {blog.title}
                <Link to={`/blogs/${blog.id}`} data-testid="blogLink">
                  <Button size="sm" variant="outline-info">
                    see
                  </Button>{' '}
                </Link>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>No blogs added</ListGroup.Item>
          )}
        </ListGroup>
      </Card>
    </>
  );
};

export default User;
