export interface IUser {
  email: string;
  name: string;
  role: string;
  uid: string;
  isOnline: boolean;
  createdAt: any;
  lastSeen: any;
}

export interface IUserList {
  loading: boolean;
  users: IUser[];
  error: string;
}

export interface IConversation {
  createdAt: any;
  isView: boolean;
  message: string;
  user_uid_1: string;
  user_uid_2: string;
}

export interface IInitialState {
  selectedNav: string;
  activeSearch: boolean;
  searchValue: undefined | string | number;
  selectedSubNav: string | undefined;
  activeChat: boolean;
  userList: IUserList | null;
  activeUser: IUser | null;
  conversations: IConversation[] | null;
}
