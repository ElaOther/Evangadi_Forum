import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./Home.css";
import Axios from "../../axios";
import Question from "../../Components/Question/Question";
//this code provided shows a Home component that retrieves
//and sets the list of questions using Axios to make a GET request to the /api/questions endpoint.
const Home = () => {
  const [userData, setUserData] = useContext(UserContext);
  const [allQuestions, setAllQuestions] = useState([]);
  const navigate = useNavigate();
  const axios = Axios();
  const Questions = async () => {
    try {
      const questionRes = await axios.get("/api/questions");
      setAllQuestions(questionRes.data.data);
    } catch (err) {
      console.log("problem", err);
    }
  };
  //Checks if the userData.user object is falsy (not logged in).
  //If it is falsy, it uses the navigate function to redirect the user to the "/login" route.
  //and Calls the Questions function to retrieve and set the list of questions.
  useEffect(() => {
    if (!userData.user) navigate("/login");
    Questions();
  }, [userData.user, navigate]);
  //The handleClick function you provided is a click event handler that prevents
  //the default behavior of the event (in this case, the default behavior of a button click),
  // and then uses the navigate function to navigate to the "/ask-question" route.
  const handleClick = (e) => {
    e.preventDefault();
    navigate("/ask-question");
  };
  return (
    <div className="container my-5 home-container">
      <div className="d-flex mb-5 justify-content-between">
        <button className="ask_button" onClick={handleClick}>
          Ask Question
        </button>
        <h4>Welcome: {userData.user?.display_name}</h4>
      </div>
      <h3>Questions</h3>
      <div>
        {allQuestions.map((question) => (
          <div key={question.post_id}>
            <hr />
            <Link
              to={`questions/${question.post_id}`}
              className="text-decoration-none text-reset"
            >
              <Question
                question={question.question}
                userName={question.user_name}
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
