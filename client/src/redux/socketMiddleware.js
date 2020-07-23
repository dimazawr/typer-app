import io from 'socket.io-client';
import { receiveMessage, setId, udpateUsersList } from './actions';
import { SEND_MESSAGE, JOIN_ROOM, LEAVE_ROOM } from './types';




export const socketMiddleware = (ENDPOINT) => {
    return store => {
        let socket = io(ENDPOINT);

        socket.on('newMessage', message => {
            store.dispatch(receiveMessage(message));
        });

        socket.on('updateUsersList', list => {
            store.dispatch(udpateUsersList(list));
        });

        return next => action => {

            switch (action.type) {
                case JOIN_ROOM:
                    socket.emit('joinRoom', action.payload , data => {
                        store.dispatch(setId(data.userId))
                    });
                    break;

                case LEAVE_ROOM:
                    socket.emit('leaveRoom', action.id);
                    break;

                case SEND_MESSAGE:
                    socket.emit('chatMessage',action.payload);
                    break;
            
                default:
                    break;
            }

            return next(action);
        }
    }
}