import { useState } from "react";
import { ListGroup, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ConfirmJoinModal } from "./ConfirmJoinModal";
import { CreateRoomModal } from "./CreateRoomModal";
import { OpenRoomModal } from "./OpenRoomModal";

export const ChatSidebar = () => {
  const [isCreateRoomOpen, setCreateRoomOpen] = useState(false);
  const [isConfirmJoinOpen, setConfirmJoinOpen] = useState(false);
  const [isOpenRoom, setOpenRoom] = useState(false);
  const [clickedRoomName, setClickedRoomName] = useState("");

  const users = useSelector((state) => state.users);

  const rooms = useSelector((state) => state.rooms);

  const usersRooms = useSelector((state) => state.user.rooms);

  const handleRoomLiClick = (e) => {
    console.log(e.target.innerText);
    let room = e.target.innerText;
    setClickedRoomName(room);
    let isRoomExists = usersRooms.includes(room);

    if (isRoomExists) {
      setOpenRoom(true);
    } else {
      setConfirmJoinOpen(true);
    }
  };

  let usersList = users.map((user) => {
    return (
      <ListGroup.Item
        key={`${user.username}_id_${user.id}`}
        className="bg-dark sidebar-text rounded-0"
      >
        {user.username}
      </ListGroup.Item>
    );
  });

  let roomsList = rooms.map((room) => {
    return (
      <ListGroup.Item
        action
        onClick={handleRoomLiClick}
        key={room}
        className="bg-dark sidebar-text rounded-0 mb-1"
      >
        {room}
      </ListGroup.Item>
    );
  });

  const closeCreateRoomModal = () => {
    setCreateRoomOpen(false);
  };

  const closeConfirmJoinModal = () => {
    setConfirmJoinOpen(false);
  };

  const closeOpenRoomModal = () => {
    setOpenRoom(false);
  };

  return (
    <aside className="d-inline-flex flex-column chat-sidebar justify-content text-monospace">
      <CreateRoomModal
        isOpen={isCreateRoomOpen}
        closeModal={closeCreateRoomModal}
      />
      <ConfirmJoinModal
        isOpen={isConfirmJoinOpen}
        closeModal={closeConfirmJoinModal}
        roomName={clickedRoomName}
      />
      <OpenRoomModal
        isOpen={isOpenRoom}
        closeModal={closeOpenRoomModal}
        roomName={clickedRoomName}
      />
      <p className="h5 text-warning m-3">Rooms</p>
      <ListGroup variant="flush">{roomsList}</ListGroup>
      <Button
        onClick={() => setCreateRoomOpen(true)}
        variant="dark"
        className="sidebar-text rounded-0"
      >
        Add <i className="bi bi-plus icon-size"></i>
      </Button>
      <p className="h5 text-warning m-3">Users</p>
      <ListGroup variant="flush" className="sidebar-text pl-0">
        {usersList}
      </ListGroup>
    </aside>
  );
};
