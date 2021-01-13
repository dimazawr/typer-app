import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Message from "./Message";

export const MessagesList = () => {
  const userId = useSelector((state) => state.socketId);
  const messages = useSelector((state) => state.messages);
  const currentRoomName = useSelector((state) => state.currentRoom.name);
  const chatBottom = useRef();

  useEffect(() => {
    chatBottom.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (typeof messages[currentRoomName] === "undefined") {
    return (
      <div className="d-inline-flex flex-column w-100 chat-messages">
        <p className="lead mx-auto text-danger">Loading...</p>
        <div ref={chatBottom} />
      </div>
    );
  } else {
    return (
      <div className="d-inline-flex flex-column w-100 chat-messages">
        {messages[currentRoomName].map((msg) => {
          const { username, text, id, to, msgId, time } = msg;
          return (
            <Message
              username={username}
              text={text}
              key={`${msgId}_${to}`}
              time={time}
              isOwner={id === userId ? true : false}
            />
          );
        })}
        <div ref={chatBottom} />
      </div>
    );
  }
};
