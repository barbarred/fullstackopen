import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';

export function SuccessNotification() {
  const successMsj = useSelector((state) => state.notification.successMessage);
  if (successMsj === '') return;
  return <Alert variant="success">{successMsj}</Alert>;
}

export function ErrorLogin() {
  const errorMsj = useSelector((state) => state.notification.errorMessage);
  if (errorMsj === '') return;
  return <Alert variant="danger">{errorMsj}</Alert>;
}

export function RemoveNotification() {
  const removeMsj = useSelector((state) => state.notification.errorRemove);
  if (removeMsj === '') return;
  return <Alert variant="danger">{removeMsj}</Alert>;
}
