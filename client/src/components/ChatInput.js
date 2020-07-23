import React from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage } from '../redux/actions';



export const ChatInput = function () {
    const userId = useSelector(state => state.socketId);
    const dispatch = useDispatch();

    const { register, handleSubmit,reset } = useForm();

    const onSubmit = ({msgInput}) => {
        dispatch(sendMessage({
            text: msgInput,
            id: userId
        }))
        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group mb-3">
                <input type="text"
                    className="form-control" 
                    placeholder="Type in message"
                    id="msgInput" ref={
                        register({
                         required: true,
                        maxLength: 300, 
                        pattern: /\S(.*\S)?/
                    })
                } 
                    onKeyPress={(e) => e.key === "Enter" ? onSubmit : null}
                    name="msgInput"
                 />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="submit" >Send</button>
                </div>
            </div>
        </form>
    )
}