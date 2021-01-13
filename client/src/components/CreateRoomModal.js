//import ReactModal from "react-modal";
import { useForm } from "react-hook-form";
import { joinRoom } from "../redux/actions";
import { useDispatch } from "react-redux";
import { Button, Form, FormGroup, Modal } from "react-bootstrap";

//ReactModal.setAppElement("#root");

export const CreateRoomModal = ({ isOpen, closeModal }) => {
  const { register, handleSubmit, errors } = useForm();

  const dispatch = useDispatch()

  const onSubmit = (data) => {
    const {room} = data;
    dispatch(
        joinRoom({
          name: room,
          isPrivate: false,
          receiverId: ''
        })
      )
      closeModal()
  };


  return (
    <>
      <Modal
              show={isOpen}
              onHide={closeModal}
              backdrop="static"
              animation={null}
              contentClassName="justify-content-between mt-5 bg-dark"
      >
          {errors.room && <p className="lead m-3 text-warning">{errors.room.message}</p>}
          <button
            className="btn btn-dark align-self-end m-2"
            onClick={closeModal}
          >
            <i className="bi bi-x text-warning icon-size"></i>
          </button>
          <Form
            className="d-flex text-center flex-column mx-auto mb-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormGroup>
              <Form.Label>Type in new room name</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                name="room"
                placeholder="Chat Room"
                ref={register({
                  required: "Room name is required",
                  pattern: {
                    value: /^[A-Za-z0-9_]{2,16}$/,
                    message:
                      "Room name should contain at least 2 and maximum 16 characters. Allowed characters are letters, digits and underscore",
                  },
                })}
              />
            </FormGroup>
            <Button variant="warning" type="submit">
              Create new room
            </Button>
          </Form>
      </Modal>
    </>
  );
};
