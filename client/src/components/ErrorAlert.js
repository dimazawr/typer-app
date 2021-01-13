
import Alert from "react-bootstrap/Alert";
import { useDispatch, useSelector } from "react-redux";
import { closeErrAlert } from "../redux/actions";

export const ErrorAlert = ({ text }) => {

    const dispatch = useDispatch()
    const isShown = useSelector (state => state.error.isShown)
  
    const close = () => {
        dispatch(closeErrAlert(false))
    }

    return (
      <Alert
        className="bg-dark"
        variant="dark"
        onClose={close}
        show={isShown}
        dismissible
      >
        {text}
      </Alert>
    );
};
