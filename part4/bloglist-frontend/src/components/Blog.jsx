import { useState } from "react"


const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const hideDetails = {display: visible ? '' : 'none'}

  const hideBtn = {display: visible ? '' : 'none'}
  const showBtn = {display: visible ? 'none' : ''}

  const showDetails = () => {
    setVisible(!visible)
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
        likes {blog.likes}<button>like</button> <br />
        {blog.author}
        </section>
      </div>
    </div>
    </>
  ) 
}

export default Blog