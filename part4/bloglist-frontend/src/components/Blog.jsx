import { useEffect, useState } from 'react'

const Blog = ({ blog, updatePost, deletePost, user }) => {
  const [visible, setVisible] = useState(false)
  const [viewBtn, setViewBtn] = useState(false)

  const hideDetails = { display: visible ? '' : 'none' }

  const hideBtn = { display: visible ? '' : 'none' }
  const showBtn = { display: visible ? 'none' : '' }

  const showDetails = () => {
    setVisible(!visible)
    if(user.username === blog.user.username){
      setViewBtn(true)
    }
  }

  const updateLikes = (event) => {
    event.preventDefault()
    updatePost({
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      id_post: blog.id
    })
  }

  const handleDelete = (event) => {
    event.preventDefault()
    if(window.confirm(`Remove ${blog.title} by ${blog.author}`)){
      deletePost({
        idToRemove: blog.id
      })
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  return(
    <>
      <div style={blogStyle} data-testid='blog'>
        <div className='title'>
          {blog.title} by {blog.author} <button style={showBtn} onClick={showDetails} className='viewBtn' >view</button><button style={hideBtn} onClick={showDetails}>hide</button>
        </div>
        <div style={hideDetails} className='post-details'>
          <section>
            <div>
              <div className='url'>{blog.url}</div>
              <div className='likes'>likes {blog.likes}<button onClick={updateLikes}>like</button></div>
              <div className='author'>{blog.author}</div>
              <div>{viewBtn ? <button onClick={handleDelete}>remove</button> : ''}</div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export default Blog