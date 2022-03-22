import { Provider } from "react-redux";
import firebase from "firebase";
import { persistStore } from "redux-persist";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { getStore } from "./redux/store/AppStore";
import { Routes as RoutedComponent } from "./routes/Index";

import { ValidationContextProvider } from "./context/ValidationContext";
import "./App.scss";
import FullPageLoader from "./ui-kit/PageLoader/Index";

const App = () => {
  const store = getStore();
  let persistor = persistStore(store);

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBcURzcTCjFA4xHQ6VNuDtsf-N5q4XgJT4",
    authDomain: "efleetmessenger.firebaseapp.com",
    projectId: "efleetmessenger",
    databaseURL: "https://efleetmessenger-default-rtdb.firebaseio.com",
    storageBucket: "efleetmessenger.appspot.com",
    messagingSenderId: "823364823554",
    appId: "1:823364823554:web:b677599a7cb838c8b1151b",
    measurementId: "G-4NGT0WP4F3",

    // apiKey: "AIzaSyBzNaQqxO-_dCp5l8PqDD3A-MD_IG_AfAI",
    // authDomain: "efleetchat-3e4cf.firebaseapp.com",
    // databaseURL: "https://efleetchat-3e4cf-default-rtdb.firebaseio.com",
    // projectId: "efleetchat-3e4cf",
    // storageBucket: "efleetchat-3e4cf.appspot.com",
    // messagingSenderId: "604677016021",
    // appId: "1:604677016021:web:ec0dc9d3061458b42f555c",
    // measurementId: "G-Z1HYKEXB8G",
  };

  firebase.initializeApp(firebaseConfig);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={<FullPageLoader />} persistor={persistor}>
          <ValidationContextProvider>
            <RoutedComponent />
          </ValidationContextProvider>
        </PersistGate>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
