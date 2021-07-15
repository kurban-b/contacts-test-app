import { useSelector } from "react-redux";
import { userSelector } from "../redux/selectors/users";
import Header from "./Header";
import Auth from "./Auth";
import Contacts from "./Contacts";

function App() {
  const user = useSelector(userSelector);

  if (user === undefined) {
    return (
      <div className="App">
        <Header />
        <Auth />
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <Contacts />
    </div>
  );
}

export default App;
