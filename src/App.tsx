import { Provider } from "react-redux";
import "./App.css";
import Layout from "./components/layout/layouts/layout";
import { store } from "./components/redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Layout />
      </div>
    </Provider>
  );
}

export default App;
