import clsx from "clsx";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useSupport, { mockUserId } from "../useSupport";
import { onClick } from "../../../helper/Properties";
import "./Livechat.scss";
import { IConversation } from "../../../redux/slice/nav-slice/Types";
import { updateMessage } from "../../../redux/slice/firebase-actions/user-actions";

function Livechat() {
  const { toggleChat, activeUser, formateFireBaseDate, conversations } =
    useSupport();

  // console.log("conversations", conversations);

  const [message, setMessage] = useState("");

  const { isToday, date, atTime } = formateFireBaseDate(activeUser?.lastseen);
  const lastseen = isToday ? atTime : date;

  const dispatch = useDispatch() as any;

  const submitMessage = (e: onClick) => {
    e.preventDefault();

    const msgObj = {
      user_uid_1: mockUserId,
      user_uid_2: activeUser?.uid,
      message,
    };

    if (message !== "") {
      dispatch(updateMessage(msgObj)).then(() => {
        setMessage("");
      });
    }
  };

  const chatHeader = (
    <div className="chat-header">
      <div className="chat-left-side">
        <div className="user-photo"></div>
        <p className="name">
          {activeUser?.name}
          {activeUser?.isOnline ? (
            <span
              className={clsx({
                online: activeUser?.isOnline,
              })}
            >
              Online
            </span>
          ) : (
            <span>last seen at {lastseen}</span>
          )}
        </p>
      </div>
      <div className="chat-right-side" onClick={toggleChat}>
        <span>
          <i className="fas fa-arrow-left"></i>
        </span>
      </div>
    </div>
  );

  const chatBody = (
    <div className="chat-body">
      {conversations?.map((con: IConversation, index) => {
        const { isToday, date, atTime } = formateFireBaseDate(con?.createdAt);

        return (
          <div
            key={index}
            className={
              con.user_uid_1 === mockUserId
                ? "message-send"
                : "message-reserved"
            }
          >
            <p>{con.message}</p>
            <p className="msg-time">{isToday ? atTime : date}</p>
          </div>
        );
      })}
    </div>
  );

  const chatFooter = (
    <div className="chat-typing">
      <div className="chat-input">
        <textarea
          className="user-input"
          rows={1}
          placeholder="Write Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>
      <div className="chat-btn-send" onClick={submitMessage}>
        <i className="fas fa-paper-plane"></i>
      </div>
    </div>
  );

  return (
    <div className="live-chat">
      {chatHeader}
      {chatBody}
      {chatFooter}
    </div>
  );
}

export default Livechat;
