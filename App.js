import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./src/redux/Store";
import Content from "./src/navigation/Content/Content";
import { ToastProvider } from "react-native-toast-notifications";
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <ToastProvider>
          <Content />
        </ToastProvider>
      </NavigationContainer>
    </Provider>
  );
}
