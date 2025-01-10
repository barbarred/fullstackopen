import { useSelector } from 'react-redux';
import './Notifications.css';

export function SuccessNotification() {
  const successMsj = useSelector((state) => state.notification.successMessage);
  if (successMsj === '') return;
  return <h3 className="successNotification">{successMsj}</h3>;
}

export function ErrorLogin() {
  const errorMsj = useSelector((state) => state.notification.errorMessage);
  if (errorMsj === '') return;
  return <h3 className="errorNotification">{errorMsj}</h3>;
}

export function RemoveNotification() {
  const removeMsj = useSelector((state) => state.notification.errorRemove);
  if (removeMsj === '') return;
  return <h3 className="errorNotification">{removeMsj}</h3>;
}
