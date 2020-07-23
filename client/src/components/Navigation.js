import React from "react";
import { Link } from "react-router-dom"
import logo from "../typewriter.png"
import { useDispatch, useSelector } from "react-redux";
import { leaveRoom } from "../redux/actions";


export const Navigation = () => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.socketId);

    const clickHandler = () => {
        dispatch(leaveRoom(userId));
    }

    return (
        <nav className="navbar bg-dark">
            <a className="navbar-brand" href="/">
                <img
                    alt="App logo"
                    src={logo}
                    className="d-inline-block align-top"
                    id="app-logo"
                />{' '}
                Typer App
            </a>
            <Link to="/" onClick={clickHandler}>
            <button type="button" className="btn btn-logout">Log Out</button>
            </Link>
        </nav>
    )
}