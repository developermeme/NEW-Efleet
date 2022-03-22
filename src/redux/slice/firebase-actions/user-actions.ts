import { database, firestore } from "firebase";
import { setConversations, setUserList } from "../nav-slice/Slice";

export const getRealtimeUsers = (uid: string, role: string) => {
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
          if (doc.data().uid !== uid && doc.data().role === role) {
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
    let postRef = database().ref("/post/chat");
    postRef
      .push({
        createdAt: database.ServerValue.TIMESTAMP,
        ...msgObj,
        isView: false,
      })
      .then((res) => {
        console.log(res.key);
      })
      .catch((error) => console.log(error));
  };
};
export const getRealtimeConversations = (user: any) => {
  // console.log("user", user);

  return async (dispatch: any) => {
    // const db = firestore();
    // db.collection("conversations")
    // .where("user_uid_1", "in", [user.uid_1, user.uid_2])
    // .orderBy("createdAt", "asc")
    // .get()
    // .then((querySnapshot) => {
    //   const conversations: any[] = [];
    //   querySnapshot.forEach((doc) => {
    //     if (
    //       (doc.data().user_uid_1 === user.uid_1 &&
    //         doc.data().user_uid_2 === user.uid_2) ||
    //       (doc.data().user_uid_1 === user.uid_2 &&
    //         doc.data().user_uid_2 === user.uid_1)
    //     ) {
    //       conversations.push(doc.data());
    //     }
    //   });

    var ref = database().ref("post");
    ref
      .orderByChild("createdAt")
      .once("value")

      .then(function (snapshot) {
        const conversations: any[] = [];

        snapshot.forEach(function (childSnapshot) {
          childSnapshot.forEach(function (colorSnapshot) {
            console.log(childSnapshot.val());
            if (
              (colorSnapshot.val().user_uid_1 === user.uid_1 &&
                colorSnapshot.val().user_uid_2 === user.uid_2) ||
              (colorSnapshot.val().user_uid_1 === user.uid_2 &&
                colorSnapshot.val().user_uid_2 === user.uid_1)
            ) {
              conversations.push(colorSnapshot.val());
            }
          });
          dispatch(setConversations(conversations));
          console.log("conversations", conversations);
        });
      });
  };
};
