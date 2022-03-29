import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  deleteUser,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  onValue,
  update,
  remove,
  push,
} from "firebase/database";
import { setConversations, setUserList } from "../slice/nav-slice/Slice";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcURzcTCjFA4xHQ6VNuDtsf-N5q4XgJT4",
  authDomain: "efleetmessenger.firebaseapp.com",
  databaseURL: "https://efleetmessenger-default-rtdb.firebaseio.com",
  projectId: "efleetmessenger",
  storageBucket: "efleetmessenger.appspot.com",
  messagingSenderId: "823364823554",
  appId: "1:823364823554:web:b677599a7cb838c8b1151b",
  measurementId: "G-4NGT0WP4F3",
};

// Initialize Firebase

// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getDatabase();

/********Authentication***********/

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = ref(db, "users/" + userAuth.uid);
  onValue(
    userDocRef,
    (snapshot) => {
      if (!snapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = Date.now();
        try {
          set(userDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInformation,
          });
        } catch (error) {
          console.log("error creating the user", error.message);
        }
      }
      return userDocRef;
    },
    {
      onlyOnce: true,
    }
  );
};

export const updateUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  let userRef = ref(db, "users/" + userAuth.uid);

  return update(userRef, additionalInformation);
};

export const deleteUserDocumentFromAuth = async (userAuth) => {
  if (!userAuth) return;

  var user = auth.currentUser;

  deleteUser(user)
    .then(() => {
      let userRef = ref(db, "users/" + userAuth.uid);
      return remove(userRef);
    })
    .catch((error) => {
      console.log(error);
    });
};

// Conversation

export const getRealtimeUsers = (uid) => {
  return async (dispatch) => {
    dispatch(
      setUserList({
        loading: true,
      })
    );

    const userDbRef = ref(db, "users/");

    const unsubscribe = onValue(userDbRef, (snapshot) => {
      let users = [];

      snapshot.forEach((snap) => {
        if (snap.key !== uid) {
          users.push({
            ...snap.val(),
            uid: snap.key,
          });
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

export const updateMessage = (msgObj) => {
  const conversationsDbRef = ref(db, "conversations/");
  return push(conversationsDbRef, {
    ...msgObj,
    isView: false,
    createdAt: Date.now(),
  });
};

export const getRealtimeConversations = (user) => {
  return async (dispatch) => {
    const conversationsDbRef = ref(db, "conversations/");

    // .where("user_uid_1", "in", [user.uid_1, user.uid_2])
    // .orderBy("createdAt", "asc");

    onValue(conversationsDbRef, (snapshot) => {
      let conversations = [];
      snapshot.forEach((doc) => {
        if (
          (doc.val().user_uid_1 === user.uid_1 &&
            doc.val().user_uid_2 === user.uid_2) ||
          (doc.val().user_uid_1 === user.uid_2 &&
            doc.val().user_uid_2 === user.uid_1)
        ) {
          conversations.push(doc.val());
        }
      });

      dispatch(setConversations(conversations));
    });
  };
};
