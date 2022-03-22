import { auth, firestore } from "firebase";

export const signup = (user: any) => {
  return async (dispatch: any, getState: any) => {
    const db = firestore();
    auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((data: any) => {
        console.log(data);
        const currentUser = auth().currentUser as any;

        currentUser
          .updateProfile({
            displayName: user.name,
          })
          .then(() => {
            db.collection("efleetusers")
              .doc(data.user.uid)
              .set({
                name: user.name,
                email: user.email,
                role: user.role,
                uid: data.user.uid,
                createdAt: new Date(),
                isOnline: true,
              })
              .then(() => {
                const loggedInUser = {
                  name: user.name,
                  email: user.email,
                  uid: data.user.uid,
                  role: user.role,
                };
                localStorage.setItem("user", JSON.stringify(loggedInUser));
                console.log("User logged in successfully...!");
              })
              .catch((error) => {
                console.log("Adding Extra Fields Error", error);
              });
          })
          .catch((error: any) => console.log("Update Profile Error", error));
      })
      .catch((error) => console.log(error));
  };
};

export const signin = (user: any) => {
  return async (dispatch: any, getState: any) => {
    auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data: any) => {
        const db = firestore();
        db.collection("efleetusers")
          .doc(data.user.uid)
          .update({
            isOnline: true,
          })
          .then(() => {
            const name = data.user.displayName;

            const loggedInUser = {
              name,
              email: data.user.email,
              role: data.user.role,
              uid: data.user.uid,
            };

            localStorage.setItem("user", JSON.stringify(loggedInUser));
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

export const isLoggedInUser = () => {
  return async (dispatch: any, getState: any) => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as any)
      : null;

    if (user) {
      console.log("Loggedin");
    } else {
      console.log("Not Loggedin");
    }
  };
};

export const logout = (uid: any) => {
  return async (dispatch: any, getState: any) => {
    const db = firestore();
    db.collection("efleetusers")
      .doc(uid)
      .update({
        isOnline: false,
        lastseen: new Date(),
      })
      .then(() => {
        auth()
          .signOut()
          .then(() => {
            localStorage.clear();
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
};
