import Axios from "./axios";
import { useContext, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { UserContext } from "./context/UserContext";
import Header1 from "./Components/Header/Header";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/SignUp/SignUp";
import Footer from "./Components/Footer/Footer";
import Que from "./Pages/AskQuestion/AskQuestion";
import AnswerQuestion from "./Pages/QuestionDetail/QuestionDetail";
//
function App() {
  //Based on this code, the purpose of the checkLoggedIn
  //function is to check if a user is logged in by retrieving the "auth-token"
  //from the local storage and making a request to the server to get user data.
  const [userData, setUserData] = useContext(UserContext);
  const axios = Axios();
  const checkLoggedIn = async () => {
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      localStorage.setItem("auth-token", "");
      token = "";
    } else {
      const userRes = await axios.get("/api/users", {
        headers: { "x-auth-token": token },
      });

      setUserData({
        token, //token:The token variable, which holds the value of the "auth-token" retrieved from the local storage.
        user: {
          //user: An object that represents user data
          id: userRes.data.data.user_id,
          display_name: userRes.data.data.user_name,
        },
      });
    }
  };
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", ""); //It uses the localStorage.setItem method to
    //set an empty string as the value for the "auth-token" key in the local storage.
    // This clears the token stored in the local storage.
  };
  useEffect(() => {
    checkLoggedIn();
  }, []);
  return (
    <Router>
      <Header1 logout={logout} />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home logout={logout} />} />
        <Route path="/ask-question" element={<Que />} />
        <Route path="/questions/:id" element={<AnswerQuestion />} />
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;
