import { useState } from "react"

const Blog = ({ blog, updatePost, deletePost }) => {
  const [visible, setVisible] = useState(false)

  const hideDetails = {display: visible ? '' : 'none'}

  const hideBtn = {display: visible ? '' : 'none'}
  const showBtn = {display: visible ? 'none' : ''}

  const showDetails = () => {
    setVisible(!visible)
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
    <div style={blogStyle}>
      <div>
        {blog.title} <button style={showBtn} onClick={showDetails}>view</button><button style={hideBtn} onClick={showDetails}>hide</button>
      </div>
      <div style={hideDetails}>
        <section>
        {blog.url} <br />
        likes {blog.likes}<button onClick={updateLikes}>like</button> <br />
        {blog.author} <br />
        <button onClick={handleDelete}>remove</button>
        </section>
      </div>
    </div>
    </>
  ) 
}

export default Blog