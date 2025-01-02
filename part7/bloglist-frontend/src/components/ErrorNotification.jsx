import './Notifications.css';

export default function ErrorLogin({ text }) {
  if (text === null) return null;
  return <h3 className="errorNotification">{text}</h3>;
}
