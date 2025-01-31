import React, { useEffect, useState } from "react";
import "./App.css";
import Input, { Survey } from "./components/Input";
import CheckBox from "./components/CheckBox";
const surveyData = require("./utils/surveyData.json");

const App = () => {
  const [loading, setLoading] = useState(false);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [check, setCheck] = useState<boolean>(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  const loadSurveyData = () => {
    setSurveys(surveyData);
  };

  useEffect(() => {
    setLoading(true);
    loadSurveyData();
  }, []);
  const survey: Survey = surveys[questionIndex];

  const handleSubmitAnswer = (value: string) => {
    if (check) {
      //this condition will be true if you say you do have health condition
      setSurveys((surveys) => {
        surveys[questionIndex].sub.answer = value;
        return surveys;
      });
      setCheck(false);
      setQuestionIndex(questionIndex + 1);
    } else {
      //this condition will be true if you say you do not have health condition
      setSurveys((surveys) => {
        surveys[questionIndex].answer = value;
        return surveys;
      });
      setQuestionIndex(questionIndex + 1);
    }
  };

  const handleCheck = (value: boolean) => {
    setCheck(value);
  };

  const renderData = () => {
    if (survey.expected.type === "boolean") {
      return (
        <div>
          <CheckBox check={check} handleCheck={handleCheck} />
          {!check ? (
            <button
              style={{ display: "flex" }}
              className="next-button"
              onClick={() => handleSubmitAnswer("no")}
            >
              next question
            </button>
          ) : null}

          {check === true ? (
            <Input
              survey={survey.sub}
              handleSubmitAnswer={handleSubmitAnswer}
              isLast={surveys.length - 1 === questionIndex}
            />
          ) : null}
        </div>
      );
    } else if (survey.expected.type === "string" || "email") {
      return (
        <Input
          survey={survey}
          handleSubmitAnswer={handleSubmitAnswer}
          isLast={surveys.length - 1 === questionIndex}
        />
      );
    } else {
      return "nothing to see";
    }
  };
  if (!loading) {
    return <div>loading ...</div>;
  } else {
    console.log("survey full state", surveys);
    return (
      <div className="App">
        <div className="App-form">
          {questionIndex !== surveys.length ? (
            <div>
              <h1>{survey.question}</h1>
              <div>{renderData()}</div>
            </div>
          ) : (
            <div>survey suceessful</div>
          )}
        </div>
      </div>
    );
  }
};

export default App;
