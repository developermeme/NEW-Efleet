import { createSlice } from "@reduxjs/toolkit";
import { Reducer } from "./Reducer";
import { IInitialState } from "./Types";

const initialState: IInitialState = {
  selectedNav: "Home",
  selectedSubNav: undefined,
  searchValue: undefined,
  activeSearch: false,
  activeChat: false,
  userList: null,
  activeUser: null,
  conversations:  null,

};

export const Slice = createSlice({
  initialState,
  name: "nav-Slice",
  reducers: Reducer,
});

export { Slice as NavSlice };

export const {
  setSelectedNav,
  setSelectedSubNav,
  setSearchData,
  setActiveSearch,
  setActiveChat,
  setUserList,
  setActiveUser,
  setConversations,
} = Slice.actions;
