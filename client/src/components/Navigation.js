import React from "react";
import { useHistory } from "react-router-dom";
import logo from "../typewriter.png";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/actions";
import { Button, Image, Navbar } from "react-bootstrap";

export const Navigation = () => {
  const dispatch = useDispatch();
  let history = useHistory();
  const userId = useSelector((state) => state.socketId);

  const clickHandler = () => {
    dispatch(logOut(userId));
    history.push("/");
  };

  return (
    <Navbar className="bg-dark" expand="false">
      <Navbar.Brand>
        <Image
          alt="App logo"
          src={logo}
          className="d-inline-block align-top"
          id="app-logo"
        />
        <span className="navbar-brand">Typer App</span>
      </Navbar.Brand>
      <Button onClick={clickHandler} variant="none" className="btn-logout">
        Log out
        <i className="bi bi-box-arrow-in-right pl-1 icon-size"></i>
      </Button>
    </Navbar>
  );
};
