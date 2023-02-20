import "react-native-gesture-handler";
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import RootNavigator from "./src/navigation/RootNavigator";

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
