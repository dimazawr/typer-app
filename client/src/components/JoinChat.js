import React from "react";
import logo from "../typewriter.png";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Card, Form, FormGroup, Button } from "react-bootstrap";
import { joinChat, joinRoom } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { ErrorAlert } from "./ErrorAlert";
import { ValidationAlert } from "./ValidationAlert";

export const JoinChat = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  const socketError = useSelector((state) => state.error);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    const { username } = data;
    dispatch(
      joinChat({
        username,
      })
    );
    dispatch(
      joinRoom({
        name: "general",
        isPrivate: false,
        receiverId: "",
      })
    );
    setTimeout(() => {
      history.push("/chat");
    }, 300);
  };

  return (
    <>
      {errors.username && <ValidationAlert text={errors.username.message} />}
      {socketError.isShown && <ErrorAlert text={socketError.text} />}

      <Card className="mt-5 mx-auto bg-dark join-form">
        <Card.Img
          variant="top"
          src={logo}
          alt="App logo"
          id="app-logo"
          className="mx-auto text-center mt-4"
        />
        <Card.Body>
          <Form className="text-center mb-5" onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                placeholder="Username"
                ref={register({
                  required: "Username is required.",
                  pattern: {
                    value: /^[A-Za-z0-9_]{2,16}$/,
                    message:
                      "Username should contain at least 2 and maximum 16 characters. Allowed characters are letters, digits and underscore",
                  },
                  validate: {
                    username: (value) =>
                      value !== "Admin" ||
                      `"Admin" is a reserved username, please choose another one`,
                  },
                })}
              />
            </FormGroup>
            <Button variant="primary" type="submit" block>
              Join
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};
