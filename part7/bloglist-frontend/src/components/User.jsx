const User = ({ user, blogs }) => {
  if (!user) return null;
  const userBlogs = blogs.filter(
    (blog) => blog.user.username === user.username
  );
  return (
    <>
      <div>
        <div>
          <h1>{user.username}</h1>
          <h2>added blogs</h2>
          {userBlogs.length > 0 ? (
            <ul>
              {userBlogs.map((blog) => (
                <li key={blog.id}>{blog.title}</li>
              ))}
            </ul>
          ) : (
            <p>No blogs added</p>
          )}
        </div>
      </div>
    </>
  );
};

export default User;
