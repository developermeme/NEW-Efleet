import React, { useEffect } from "react";
import clsx from "clsx";
import useSupport, { authUserId } from "./useSupport";
import ChatList from "./chatlist/ChatList";
import Livechat from "./livechat/Livechat";
import "./Style.scss";
import { useDispatch } from "react-redux";
import { getRealtimeUsers } from "../../redux/firebase/firebase";


function Support() {
  const { activeChat } = useSupport();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRealtimeUsers(authUserId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="main-side">
      <div className={clsx("friend-side scroll", { hide: activeChat })}>
        <ChatList />
      </div>
      <div className={clsx("chat-side", { active: activeChat })}>
        <Livechat />
      </div>
    </main>
  );
}

export default Support;
