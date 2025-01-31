import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const Blog = ({ blog }) => {
  return (
    <>
      <Table striped className="blogTable">
        <tbody>
          <tr>
            <td>
              <Link to={`/blogs/${blog.id}`} data-testid="blogLink">
                {blog.title} by {blog.author}{' '}
              </Link>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default Blog;
