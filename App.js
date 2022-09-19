import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import store from "./src/redux/Store";
import Content from "./src/navigation/Content/Content";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Content />
      </NavigationContainer>
    </Provider>
  );
}
