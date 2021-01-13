import React from "react";

import { ChatSidebar } from "./ChatSidebar";
import { MessagesList } from "./MessagesList";
import { ChatInput } from "./ChatInput";
import { Navigation } from "./Navigation";
import { useSelector } from "react-redux";
import { ErrorAlert } from "./ErrorAlert";

function Chat() {

    const socketError = useSelector(state => state.error);

  return (
    <div>
        {socketError.isShown && <ErrorAlert text={socketError.text} />}
      <Navigation />
      <div className="d-flex flex-row chat-container">
        <ChatSidebar />
        <MessagesList />
      </div>
      <ChatInput />
    </div>
  );
}

export default Chat;
