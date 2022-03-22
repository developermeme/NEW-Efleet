import { firestore } from "firebase";
import { setConversations, setUserList } from "../nav-slice/Slice";

export const getRealtimeUsers = (uid: string) => {
  return async (dispatch: any) => {
    const db = firestore();

    dispatch(
      setUserList({
        loading: true,
      })
    );
    const unsubscribe = db
      .collection("efleetusers")
      .onSnapshot((querySnapshot: any) => {
        const users: any = [];
        querySnapshot.forEach(function (doc: any) {
          // console.log("users", users);
          if (doc.data().uid !== uid) {
            users.push(doc.data());
          }
        });
        dispatch(
          setUserList({
            loading: false,
            users,
          })
        );
      });

    return unsubscribe;
  };
};

export const updateMessage = (msgObj: any) => {
  return async (dispatch: any) => {
    const db = firestore();
    db.collection("conversations")
      .add({
        ...msgObj,
        isView: false,
        createdAt: new Date(),
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const getRealtimeConversations = (user: any) => {
  console.log("user", user);

  return async (dispatch: any) => {
    const db = firestore();
    db.collection("conversations")
      .where("user_uid_1", "in", [user.uid_1, user.uid_2])
      .orderBy("createdAt", "asc")
      .onSnapshot((querySnapshot) => {
        const conversations: any[] = [];
        querySnapshot.forEach((doc) => {
          if (
            (doc.data().user_uid_1 === user.uid_1 &&
              doc.data().user_uid_2 === user.uid_2) ||
            (doc.data().user_uid_1 === user.uid_2 &&
              doc.data().user_uid_2 === user.uid_1)
          ) {
            conversations.push(doc.data());
          }
        });
        dispatch(setConversations(conversations));
        // console.log("conversations", conversations);
      });
  };
};
