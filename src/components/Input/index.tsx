import React, { useState, useRef } from "react";
import "./index.css";

interface SubSurvey {
  sub: any;
  question: string;
  answer: string | number;
  expected: {
    placeholder: string;
    type: string;
  };
}
export interface Survey {
  question: string;
  answer: string | number;
  expected: {
    placeholder: string;
    type: string;
  };
  sub: SubSurvey;
}

interface Props {
  survey: Survey;
  handleSubmitAnswer: (value: any) => void;
}

const Input = (props: Props) => {
  const { expected } = props.survey;
  const [error, setError] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<any>("");
  const mainInput = useRef<any>("");
  const validateEmail = (email: string) => {
    const re = /^(([^<>()\],;:\s@"]+([^<>()\],;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setError(!re.test(email));
  };

  const validateAge = (age: number) => {
    console.log(isNaN(age), "age vali");
    setError(!(age > 18 && age < 65));
  };
  const validateString = (string: string) => {
    setError(!String(string).match(/^[a-zA-Z ]+$/));
  };

  const handleValidation = (value: string | number, type: string) => {
    setError(true);
    switch (type) {
      case "email":
        validateEmail(value as string);
        break;
      case "number":
        validateAge(value as number);
        break;
      case "string":
        validateString(value as string);
        break;
      default:
        console.log("incorrect value");
    }
  };

  const handleEnter = (newEvent: any) => {
    if (!error && newEvent.length !== 0) {
      handleValidation(newEvent, expected.type);
      props.handleSubmitAnswer(newEvent);
      setInputValue("");
    }
  };
  return (
    <div className="input-container">
      <input
        ref={mainInput}
        value={inputValue}
        className="survey-input"
        type="email"
        onFocus={(event) => handleValidation(event.target.value, expected.type)}
        onChange={(event) => {
          handleValidation(event.target.value, expected.type);
          setInputValue(event.currentTarget.value);
        }}
        onBlur={(event) => {
          handleValidation(event.target.value, expected.type);
        }}
        placeholder={expected.placeholder}
        onKeyUp={(event) => {
          if (event.currentTarget.value.length === 0) {
            setError(true);
          }
          var newEvent = event.currentTarget.value;
          if (
            event.keyCode === 13 &&
            !error &&
            event.currentTarget.value.length !== 0
          ) {
            handleEnter(newEvent);
            event.currentTarget.value = "";
          }
        }}
      />
      {error ? (
        <span className="survey-span">Invalid {expected.placeholder}</span>
      ) : null}
      <button className="next-button" onClick={() => handleEnter(inputValue)}>
        Next Question
      </button>
    </div>
  );
};

export default Input;
