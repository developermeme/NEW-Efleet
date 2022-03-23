import { Provider } from "react-redux";
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
