import { JOIN_ROOM, LEAVE_ROOM, SET_ID, RECEIVE_MESSAGE, SEND_MESSAGE, UPDATE_USERS_LIST }  from "./types";


const initialState = {
    user: { },
    socketId: '',
    isLoggedIn: false,
    currentMessage: {},
    messages: [],
    users: []
 }


export function rootReducer(state = initialState, action) {
    switch (action.type) {

        case JOIN_ROOM:
            return {...state, user: action.payload, isLoggedIn: true};

        case LEAVE_ROOM:

                return { ...initialState };

        //had an idea to set id inside middleware, that it would be a property inside JOIN_ROOM, but decided that
        // a separate action would be more smooth

        case SET_ID:
            return {...state, socketId: action.payload};


        case RECEIVE_MESSAGE:
            return {...state, messages: state.messages.concat([action.payload])};
                
    
        case SEND_MESSAGE:
                return {...state, currentMessage: action.payload};
    
        case UPDATE_USERS_LIST:
            return {...state, users: action.payload}
            
    
        default:
            return state;
            
    }
}
