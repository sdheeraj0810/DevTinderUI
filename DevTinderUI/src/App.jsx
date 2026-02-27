import { BrowserRouter,Route,Routes } from "react-router-dom"
import Body from "./Components/Body";
import Profile from "./Components/Profile";
import Feed from "./Components/Feed";
import Login from "./Components/Login";
import { Provider } from "react-redux";
import appStore from "./utils/appstore";
import EditProfile from "./Components/EditProfile";
import Connections from "./Components/Connections";
import Requests from "./Components/Requests";

function App() {

  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body></Body>}>
          <Route path="/" element={<Feed></Feed>} />          
          <Route path="/editprofile" element={<EditProfile></EditProfile>} />
          <Route path="/profile" element={<Profile></Profile>} />
          <Route path="/connections" element={<Connections></Connections>} />
          <Route path="/requests" element={<Requests></Requests>} />
        </Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>    
    </Provider>
    </>
  )
}

export default App
