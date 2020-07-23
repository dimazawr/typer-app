import React from "react";
import logo from "../typewriter.png";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { joinRoom } from "../redux/actions";
import { useDispatch } from "react-redux";
import { Alert } from "./Alert";


function SignIn() {

const history = useHistory();

const dispatch = useDispatch();


const {register, handleSubmit, errors} = useForm();

    const onSubmit = (data) => {

        const { username, room } = data;
        dispatch(joinRoom({
            username,
            room
        }))
        history.push('/chat');
    }

    return(
    
        <>
        { errors.username && <Alert text={errors.username.message}/> }

        { errors.room && <Alert text={errors.room.message}/> }

        <div className="mt-5 mx-auto bg-dark join-form">
            <div className="mx-auto text-center">
                <img src={logo} alt="App logo" id="app-logo" className="card-img-top mt-4"/>
            </div>
            <div className="card-body">
                <form className="mx-auto mb-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>Username</label>
                        <input className="form-control" 
                                size="sm"
                                type="text"
                                name="username" 
                                placeholder="Username" 
                                ref={register({
                                    required: "Username is required.",
                                    pattern: {
                                        value: /^[A-Za-z0-9_]{2,16}$/,
                                        message: "Username should contain at least 2 and maximum 16 characters. Allowed characters are letters, digits and underscore"
                                    }
                                })} 
                        />
                    </div>

                    <div className="form-group" >
                        <label>Chat Room</label>
                        <input className="form-control" 
                                size="sm" 
                                type="text" 
                                name="room" 
                                placeholder="Chat Room" 
                                ref={register({
                                    required: "Room name is required",
                                    pattern: {
                                        value: /^[A-Za-z0-9_]{2,16}$/,
                                        message: "Room name should contain at least 2 and maximum 16 characters. Allowed characters are letters, digits and underscore"
                                    }
                                    })} 
                        />
                    </div>
                    <button className="btn btn-primary btn-block" type="submit">
                        Join
                    </button>
                </form>
            </div>
        </div>
        </>
        
    )
}



export default SignIn;