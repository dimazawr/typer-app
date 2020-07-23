import React from 'react';

import { ChatSidebar } from './ChatSidebar';
import MessagesList from './MessagesList';
import { ChatInput } from './ChatInput';
import { Navigation } from './Navigation';




  function Chat() {
    

      return (
          <div>
              
              <Navigation />
              
              <div className="d-flex flex-row chat-container">
                    <ChatSidebar />
                    <MessagesList />
              </div>
              <ChatInput/>
          </div>

      )
  };



  export default Chat