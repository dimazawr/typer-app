import { joinRoom } from "../redux/actions";
import { useDispatch } from "react-redux";
import { Button, Modal } from "react-bootstrap";

export const ConfirmJoinModal = ({ isOpen, closeModal, roomName }) => {
  const dispatch = useDispatch();

  const confirmJoin = () => {
    dispatch(
      joinRoom({
        name: roomName,
        isPrivate: false,
        receiverId: "",
      })
    );
    closeModal();
  };

  return (
    <Modal
      show={isOpen}
      onHide={closeModal}
      backdrop="static"
      animation={null}
      contentClassName="justify-content-between mt-5 bg-dark"
    >
      <Button
        variant="dark"
        className="align-self-end m-2"
        onClick={closeModal}
      >
        <i className="bi bi-x text-warning icon-size"></i>
      </Button>
      <div className="d-flex flex-column p-4 text-center">
        <p className="lead text-warning">Would you like to join {roomName}?</p>
        <Button
          variant="warning"
          className="w-50 align-self-center"
          type="submit"
          onClick={confirmJoin}
        >
          Join
        </Button>
      </div>
    </Modal>
  );
};
