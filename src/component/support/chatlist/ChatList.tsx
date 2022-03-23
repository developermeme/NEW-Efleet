import { useEffect } from "react";
import clsx from "clsx";
import useSupport from "../useSupport";
import { IUser } from "../../../redux/slice/nav-slice/Types";
import "./ChatList.scss";

function ChatList() {
  const {
    userList,
    activeUser,
    setActiveUserInfo,
    handleUserItemClick,
    formateFireBaseDate,
  } = useSupport();

  useEffect(() => {
    const users = (userList?.users as IUser[]) || [];
    if (users?.length) {
      setActiveUserInfo(users[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userList]);

  const topNav = (
    <div className="messages-header">
      <div className="message-title">
        <p>All Messages</p>
      </div>
    </div>
  );

  const chatListView = userList?.users?.map((record: IUser, index: number) => {
    const time = record.lastSeen;

    const { isToday, date, atTime } = formateFireBaseDate(time);

    return (
      <li
        className={clsx(`${record.isOnline}`, {
          online: record.isOnline,
          offline: !record.isOnline,
          "active-chat": activeUser?.uid === record.uid,
        })}
        onClick={() => handleUserItemClick(record)}
        key={record.uid}
      >
        <div className="chat-wrapper">
          <div
            className="chat-pic"
            // style={{ backgroundColor: generateRandomCode() }}
          >
            <span className="user-initial">{record?.name?.slice(0, 1)}</span>
            <span className="status-indicator"></span>
          </div>
          <div className="name-subchat">
            <p className="name">{record.name}</p>
            <p className="sub-of-chat">{record.role}</p>
          </div>
        </div>
        {!record.isOnline && (
          <div className="time">
            <p className="date">{isToday ? atTime : date}</p>
          </div>
        )}
      </li>
    );
  });

  return (
    <div className="friends-list">
      {topNav}
      <div className="chat-list">
        <ul>{chatListView}</ul>
      </div>
    </div>
  );
}

export default ChatList;
