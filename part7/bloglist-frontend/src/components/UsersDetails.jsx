import { Link } from 'react-router-dom';

const UserDetails = ({ users }) => {
  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <Link to={`/users/${user.id}`}>
                <td>{user.username}</td>
              </Link>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserDetails;
