import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [likes, setLikes] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
      likes: likes
    })
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type="text"
            value={title}
            name='Title'
            onChange={ event => setTitle(event.target.value) }
            className='title'
            data-testid='title'
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name='Author'
            onChange={ event => setAuthor(event.target.value) }
            className='author'
            data-testid='author'
          />
        </div>
        <div>
          url
          <input
            type="url"
            value={url}
            name='Url'
            onChange={ event => setUrl(event.target.value) }
            className='url'
            data-testid='url'
          />
        </div>
        <div>
          likes
          <input
            type="num"
            value={likes}
            name='Likes'
            onChange={event => setLikes(event.target.value) }
            className='likes'
            data-testid='likes'
          />
        </div>
        <button type='submit' className='btn'>create</button>
      </form>
    </div>
  )
}

export default BlogForm