import { useState, forwardRef, useImperativeHandle } from "react"


const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideBtn = {display: visible ? 'none' : '' }
  const showBtn = {display: visible ? '' : 'none'}

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
    
  })
  return(
    <div>
      <div style={hideBtn}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showBtn}>
      {props.children}
      <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

export default Togglable