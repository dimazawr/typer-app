import {
  RECEIVE_MESSAGE,
  SEND_MESSAGE,
  JOIN_CHAT,
  JOIN_ROOM,
  SET_ID,
  UPDATE_USERS_LIST,
  UPDATE_ROOMS_LIST,
  SET_CURRENT_ROOM,
  SET_USERS_ROOMS,
  LOG_OUT,
  SHOW_ERR_ALERT,
  CLOSE_ERR_ALERT,
} from "./types";

export function joinChat(user) {
  return {
    type: JOIN_CHAT,
    payload: user,
  };
}

export function joinRoom(room) {
  return {
    type: JOIN_ROOM,
    payload: room,
  };
}

export function logOut() {
  return {
    type: LOG_OUT,
  };
}

export function setId(id) {
  return {
    type: SET_ID,
    payload: id,
  };
}

export function setCurrentRoom(currentRoom) {
  return {
    type: SET_CURRENT_ROOM,
    payload: currentRoom,
  };
}

export function setUsersRooms(rooms) {
  return {
    type: SET_USERS_ROOMS,
    payload: rooms,
  };
}

export function udpateUsersList(list) {
  return {
    type: UPDATE_USERS_LIST,
    payload: list,
  };
}

export function udpateRoomsList(list) {
  return {
    type: UPDATE_ROOMS_LIST,
    payload: list,
  };
}

export function receiveMessage(message) {
  return {
    type: RECEIVE_MESSAGE,
    payload: message,
  };
}

export function sendMessage(message) {
  return {
    type: SEND_MESSAGE,
    payload: message,
  };
}

export function showErrAlert(err) {
  return {
    type: SHOW_ERR_ALERT,
    payload: err,
  };
}

export function closeErrAlert(bool) {
    return {
      type: CLOSE_ERR_ALERT,
      payload: bool,
    };
  }
