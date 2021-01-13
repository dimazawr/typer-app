import { setCurrentRoom } from "../redux/actions";
import { useDispatch } from "react-redux";
import { Button, Modal } from "react-bootstrap";

export const OpenRoomModal = ({ isOpen, closeModal, roomName }) => {
  const dispatch = useDispatch();

  const openRoom = () => {
    dispatch(
      setCurrentRoom({
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
        <p className="lead text-warning">Would you like to open {roomName}?</p>
        <div className="d-flex flex-column flex-sm-row justify-content-around p-4 text-center">
          <Button variant="warning" className="mb-3" onClick={openRoom}>
            Open Room
          </Button>
        </div>
      </div>
    </Modal>
  );
};
