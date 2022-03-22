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
    storageBucket: "efleetmessenger.appspot.com",
    messagingSenderId: "823364823554",
    appId: "1:823364823554:web:b677599a7cb838c8b1151b",
    measurementId: "G-4NGT0WP4F3",
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
