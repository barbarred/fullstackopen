import { Link } from 'react-router-dom';
import { ListGroup, Badge } from 'react-bootstrap';

const UserDetails = ({ users }) => {
  return (
    <>
      <div className="user-header-details">
        <h3>Users</h3>
        <p>blogs created</p>
      </div>
      <ListGroup as="ol" numbered>
        {users.map((user) => (
          <ListGroup.Item
            key={user.id}
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </div>
            </div>
            <Badge bg="primary" pill>
              {user.blogs.length}
            </Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
};

export default UserDetails;
