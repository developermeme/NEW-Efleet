import { useDispatch, useSelector } from "react-redux";
import { getRealtimeConversations } from "../../redux/firebase/firebase";
import { IRootState } from "../../redux/reducer/CombineReducer";

import {
  setActiveChat,
  setActiveUser,
} from "../../redux/slice/nav-slice/Slice";
import { IUser } from "../../redux/slice/nav-slice/Types";

export const authUser = JSON.parse(localStorage.getItem("user") as any) as any;
export const authUserId = authUser?.uid;

function useSupport() {
  const { navData } = useSelector((state: IRootState) => state);
  const activeChat = navData && navData.activeChat;
  const userList = navData && navData.userList;
  const activeUser = navData && navData.activeUser;
  const conversations = navData && navData.conversations;

  const dispatch = useDispatch();

  const toggleChat = () => {
    dispatch(setActiveChat(!activeChat));
  };

  const setActiveUserInfo = (user: IUser) => {
    dispatch(setActiveUser(user));
    dispatch(getRealtimeConversations({ uid_1: authUserId, uid_2: user.uid }));
  };

  const handleUserItemClick = (user: IUser) => {
    toggleChat();
    setActiveUserInfo(user);
  };

  const formateFireBaseDate = (time: any) => {
    const fireBaseTime = new Date(time);
    const date = fireBaseTime.toLocaleDateString("en-US");
    const atTime = fireBaseTime.toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
    });

    const d = new Date();
    const isToday = d.toDateString() === fireBaseTime.toDateString();

    return { isToday, date, atTime };
  };

  return {
    userList,
    activeChat,
    activeUser,
    conversations,
    toggleChat,
    setActiveUserInfo,
    handleUserItemClick,
    formateFireBaseDate,
  };
}

export default useSupport;
