import { PayloadAction } from "@reduxjs/toolkit";
import { IInitialState, IUser, IUserList, IConversation } from "./Types";

export const Reducer = {
  setSelectedNav: (
    state: IInitialState,
    action: PayloadAction<string>
  ): void => {
    state.selectedNav = action.payload;
  },
  setSelectedSubNav: (
    state: IInitialState,
    action: PayloadAction<string>
  ): void => {
    state.selectedSubNav = action.payload;
  },
  setSearchData: (
    state: IInitialState,
    action: PayloadAction<string | number | undefined>
  ): void => {
    state.searchValue = action.payload;
  },
  setActiveSearch: (
    state: IInitialState,
    action: PayloadAction<boolean>
  ): void => {
    state.activeSearch = action.payload;
  },
  setActiveChat: (
    state: IInitialState,
    action: PayloadAction<boolean>
  ): void => {
    state.activeChat = action.payload;
  },
  setUserList: (
    state: IInitialState,
    action: PayloadAction<IUserList | any>
  ): void => {
    state.userList = {
      ...state.userList,
      ...action.payload,
    };
  },
  setActiveUser: (state: IInitialState, action: PayloadAction<IUser>): void => {
    state.activeUser = action.payload;
  },
  setConversations: (
    state: IInitialState,
    action: PayloadAction<IConversation[]>
  ): void => {
    state.conversations = action.payload;
  },
};
