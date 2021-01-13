import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { sendMessage } from "../redux/actions";

export const ChatInput = function () {
  const userId = useSelector((state) => state.socketId);
  const currentRoom = useSelector((state) => state.currentRoom);
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = ({ msgInput }) => {
    dispatch(
      sendMessage({
        text: msgInput,
        from: userId,
        to: currentRoom.isPrivate ? currentRoom.receiverId : currentRoom.name,
        isPrivate: currentRoom.isPrivate,
      })
    );
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Type in message"
          id="msgInput"
          ref={register({
            required: true,
            maxLength: 300,
            pattern: /\S(.*\S)?/,
          })}
          onKeyPress={(e) => (e.key === "Enter" ? onSubmit : null)}
          name="msgInput"
        />
        <InputGroup.Append>
          <Button variant="outline-secondary" type="submit">
            Send
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
};
