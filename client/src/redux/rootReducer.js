import {
  JOIN_CHAT,
  JOIN_ROOM,
  SET_ID,
  RECEIVE_MESSAGE,
  SEND_MESSAGE,
  UPDATE_USERS_LIST,
  SET_CURRENT_ROOM,
  UPDATE_ROOMS_LIST,
  SET_USERS_ROOMS,
  LOG_OUT,
  SHOW_ERR_ALERT,
  CLOSE_ERR_ALERT,
} from "./types";

const initialState = {
  user: {
    // username: '',
    // id: socket.id
  },
  socketId: "",
  isLoggedIn: false,
  currentMessage: {},
  currentRoom: {
    name: "",
    isPrivate: false,
    receiverId: "",
  },
  messages: {
    // general: []
  },
  users: [],
  rooms: [
    //     name: '',
  ],
  error: {
      isShown: false,
      text: ''
  }
};

export function rootReducer(state = initialState, action) {
  switch (action.type) {
    case JOIN_CHAT:
      return { ...state, user: action.payload, isLoggedIn: true };

    case JOIN_ROOM:
      return { ...state, currentRoom: action.payload };

    case LOG_OUT:
      return { ...initialState };

    case SET_CURRENT_ROOM:
      return { ...state, currentRoom: action.payload };

    case SET_ID:
      return { ...state, socketId: action.payload };

    case SET_USERS_ROOMS:
      return { ...state, user: { ...state.user, rooms: action.payload } };

    case RECEIVE_MESSAGE:
      if (typeof state.messages[action.payload.to] !== "undefined") {
        return {
          ...state,
          messages: {
            ...state.messages,
            [action.payload.to]: [
              ...state.messages[action.payload.to],
              action.payload,
            ],
          },
        };
      } else {
        return {
          ...state,
          messages: {
            ...state.messages,
            [`${action.payload.to}`]: [action.payload],
          },
        };
      }

    case SEND_MESSAGE:
      return { ...state, currentMessage: action.payload };

    case UPDATE_USERS_LIST:
      return { ...state, users: action.payload };

    case UPDATE_ROOMS_LIST:
      return { ...state, rooms: action.payload };

    case SHOW_ERR_ALERT:
      return { ...state, error: action.payload };

    case CLOSE_ERR_ALERT:
        return {...state, error: {...state.error, isShown: false}}

    default:
      return state;
  }
}
