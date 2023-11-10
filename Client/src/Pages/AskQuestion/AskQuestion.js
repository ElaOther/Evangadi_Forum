import React, { useContext, useState } from "react";
import "./AskQuestion.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Axios from "../../axios";
// the component that uses the UserContext, useState, and useNavigate hooks from React. 
//It also defines a handleChange function to update the form state.
export default function AskQuestion() {
  const [userData, setUserData] = useContext(UserContext);
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  //The code snippet you provided shows a handleSubmit function that uses Axios to make
  // a POST request to an API endpoint. It sends data from the userData, form, and navigate objects.
  const axios = Axios();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/questions", {
        id: userData.user.id,
        question: form.question,
        questionDescription: form.questionDescription,
      });
      e.target.reset();
      navigate("/");
    } catch (err) {
      console.log("problem", err);
    }
  };
  return (
    <div className="container my-5">
      <div className="d-flex flex-column align-items-center my-5">
        <h3>Steps to write a good question</h3>
        <ul className="question_steps">
          <li>Summerize your problem in a one-line title.</li>
          <li>Describe your problem in more detail.</li>
          <li>Describe what you tried and what you expected to happen.</li>
          <li>Review your question and post it to the site.</li>
        </ul>
      </div>
      <form
        onSubmit={handleSubmit}
        className="d-flex flex-column p-5 question_form  justify-content-between"
      >
        <h3>Ask a public question</h3>
        <Link to="/" className="text-decoration-none text-reset cursor-pointer">
          Go to Question page
        </Link>
        <input
          className="question_title"
          type="text"
          name="question"
          Placeholder="Title"
          onChange={handleChange}
        />
        <textarea
          className="question_input"
          placeholder="Question Description..."
          name="questionDescription"
          onChange={handleChange}
        ></textarea>
        <button className="question_post_btn" type="">
          Post Your Question
        </button>
      </form>
    </div>
  );
}
