import React, { useEffect, useState } from "react";
import "./App.css";
import InputForm, { Survey } from "./components/inputForm";
const surveyData = require("./utils/surveyData.json");

interface Props {
  survey: object;
}

const App = () => {
  const [loading, setLoading] = useState(false);
  const [surveys, setSurveys] = useState<Survey[]>([]);
  // const [answer, setAnswer] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);

  const loadSurveyData = () => {
    setSurveys(surveyData);
  };

  useEffect(() => {
    setLoading(true);
    loadSurveyData();
    console.log("survey", surveyData);
  }, []);

  const handleSubmitAnswer = (value: any) => {
    setSurveys((surveys) => {
      surveys[questionIndex].answer = value;
      return surveys;
    });
  };
  if (!loading) {
    return <div>loading ...</div>;
  } else {
    console.log("queation", surveys[questionIndex], surveys.length);
    return (
      <div className="App">
        <div className="App-form">
          {questionIndex !== surveys.length ? (
            <div>
              <InputForm
                survey={surveys[questionIndex]}
                handleSubmitAnswer={handleSubmitAnswer}
                // handleInputChange={handleInputChange}
              />
              <button onClick={() => setQuestionIndex(questionIndex + 1)}>
                Next Question
              </button>
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
