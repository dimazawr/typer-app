import { RECEIVE_MESSAGE, SEND_MESSAGE, JOIN_ROOM, LEAVE_ROOM, SET_ID, UPDATE_USERS_LIST } from "./types";




export function joinRoom (user) {
    return {
        type: JOIN_ROOM,
        payload: user,
    }
}


export function leaveRoom (id) {
    return {
        type: LEAVE_ROOM,
        id
    }
}

export function setId (id) {
    return {
        type: SET_ID,
        payload: id,
    }
}



export function udpateUsersList(list) {
    return {
        type: UPDATE_USERS_LIST,
        payload: list
    }
}


export function receiveMessage (message) {
    return {
        type: RECEIVE_MESSAGE,
        payload: message
    }
}

export function sendMessage (message) {
    return {
        type: SEND_MESSAGE,
        payload: message
    }
}