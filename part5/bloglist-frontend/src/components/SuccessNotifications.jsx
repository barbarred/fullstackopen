import './Notifications.css'


export default function SuccessNotification ({ text }) {
  if(text === null) return null
  return (
    <h3 className="successNotification">{text}</h3>
  )
}