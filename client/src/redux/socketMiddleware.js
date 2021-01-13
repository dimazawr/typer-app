import io from "socket.io-client";
import {
  receiveMessage,
  setId,
  udpateRoomsList,
  udpateUsersList,
  setUsersRooms,
  showErrAlert,
} from "./actions";
import { SEND_MESSAGE, JOIN_CHAT, JOIN_ROOM, LOG_OUT } from "./types";

export const socketMiddleware = (ENDPOINT) => {
  return (store) => {
    let socket = io(ENDPOINT);

    socket.on("newMessage", (message) => {
      store.dispatch(receiveMessage(message));
    });

    socket.on("updateUsersList", (list) => {
      store.dispatch(udpateUsersList(list));
    });

    socket.on("updateRoomsList", (listOfRooms) => {
      store.dispatch(udpateRoomsList(listOfRooms));
    });

    socket.on("disconnect", (reason) => {
      if (reason === "io server disconnect") {
        socket.connect();
      }
      store.dispatch(showErrAlert({ isShown: true, text: reason }));
    });

    return (next) => (action) => {
      switch (action.type) {
        case JOIN_CHAT:
          socket.emit("joinChat", action.payload, (data) => {
            store.dispatch(setId(data.userId));
          });
          break;

        case JOIN_ROOM:
          socket.emit("joinRoom", action.payload, (data) => {
            store.dispatch(setUsersRooms(data.userRooms));
          });
          break;

        case LOG_OUT:
          socket.emit("leaveChat");
          break;

        case SEND_MESSAGE:
          socket.emit("chatMessage", action.payload);
          break;

        default:
          break;
      }

      return next(action);
    };
  };
};
