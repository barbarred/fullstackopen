export const NotificationError = ({errorMessage}) => {
  if(errorMessage === null){
    return null
  }

  return(
    <div className="error">{errorMessage}</div>
  )
}