import React, { useEffect, useState } from "react";
import clsx from "clsx";
import useSupport, { mockUserId } from "./useSupport";
import ChatList from "./chatlist/ChatList";
import Livechat from "./livechat/Livechat";
import "./Style.scss";
import { useDispatch } from "react-redux";
import { getRealtimeUsers } from "../../redux/slice/firebase-actions/user-actions";
import { useStorageValues } from "../../hooks/useLocalStorage";

function Support() {
  const { activeChat } = useSupport();

  const dispatch = useDispatch();
  const { loginRole } = useStorageValues();
  const role = loginRole === "SUPER_ADMIN" ? "ADMIN" : "RIDER";

  useEffect(() => {
    dispatch(getRealtimeUsers(mockUserId, role));
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
