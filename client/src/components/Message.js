import React from "react";
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');

dayjs.extend(utc);

const Message = ({username, text, isOwner,time}) => {
    let convertedTime = dayjs(time).local().format('MMM DD HH:mm')
    let divClasses;
    if(isOwner) {
        divClasses = "d-flex flex-column align-self-end chat-message m-3 ml-0 p-2"
    } else {
        divClasses = "d-flex flex-column chat-message m-3 mr-0 p-2";
    }

    return (
        <div className={divClasses}>
            <span className="d-inline-block message-user small-text">{username}: </span>
            <p className="mb-0">{text}</p>
            <span className="d-inline-block message-date text-right small-text"><small>{convertedTime}</small></span>
        </div>
    )
}

export default Message;