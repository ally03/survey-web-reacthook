import React, { useState } from "react";
import "./index.css";

export interface Survey {
  question: string;
  answer: string | number;
  expected: {
    placeholder: string;
    type: string;
  };
}
interface Props {
  survey: Survey;
  handleSubmitAnswer: (value: any) => void;
  handleNext: () => void;
}

const InputForm = (props: Props) => {
  const { expected } = props.survey;
  const [error, setError] = useState<boolean>(false);
  //   const [inputValue, setInputValue] = useState<any>("hafiz");

  const validateEmail = (email: string) => {
    const re = /^(([^<>()\],;:\s@"]+([^<>()\],;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setError(!re.test(email));
  };

  const validateAge = (age: number) => {
    console.log(isNaN(age), "age vali");
    setError(!(age > 18 && age < 65));
  };
  const validateString = (string: string) => {
    setError(!string.match(/^[a-zA-Z]+$/));
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

  const handleNext = (event: any) => {
    if (!error) {
      //   console.log("inputValue:", inputValue);
      //   props.handleSubmitAnswer(inputValue);
      props.handleNext();
    }
  };
  return (
    <div>
      <h1>{props.survey.question}</h1>
      <div className="">
        <input
          type="email"
          onFocus={(event) =>
            handleValidation(event.target.value, expected.type)
          }
          onChange={(event) => {
            handleValidation(event.target.value, expected.type);
            // setInputValue(event.currentTarget.value);
          }}
          onBlur={(event) => {
            handleValidation(event.target.value, expected.type);
          }}
          placeholder={expected.placeholder}
          onKeyUp={(event) => {
            if (event.currentTarget.value.length === 0) {
              setError(true);
            }
            if (
              event.keyCode === 13 &&
              !error &&
              event.currentTarget.value.length !== 0
            ) {
              handleValidation(event.currentTarget.value, expected.type);
              console.log("hello on submit working", event.currentTarget.value);
              props.handleSubmitAnswer(event.currentTarget.value);
              event.currentTarget.value = "";
            }
          }}
        />
        {error ? <span>Invalid {expected.placeholder}</span> : null}
      </div>
      <button onClick={handleNext}>Next Question</button>
    </div>
  );
};

export default InputForm;
