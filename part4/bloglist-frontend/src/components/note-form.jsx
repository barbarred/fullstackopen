const BlogForm = ({
  handleSubmit,
  title,
  handleTitleChange,
  author,
  handleAuthorChange,
  url,
  handleUrlChange,
  likes,
  handleLikesChange
}) => {
  return(
    <div>
    <h2>create new</h2>
        <form onSubmit={handleSubmit}>
        <div>
          title
            <input 
            type="text" 
            value={title}
            name='Title'
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author
            <input 
              type="text" 
              value={author}
              name='Author'
              onChange={handleAuthorChange}
            />
        </div>
        <div>
          url
            <input 
              type="url" 
              value={url}
              name='Url'
              onChange={handleUrlChange}
            />
        </div>
        <div>
          likes
            <input 
              type="num" 
              value={likes}
              name='Likes'
              onChange={handleLikesChange}
            />
        </div>
        <button type='submit'>create</button>
        </form>
    </div>
  )
}

export default BlogForm