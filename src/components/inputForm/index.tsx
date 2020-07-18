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
}

const InputForm = (props: Props) => {
  const { expected } = props.survey;
  const [error, setError] = useState<boolean>(false);
  const validateEmail = (email: string) => {
    const re = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log("regex", re.test(email));
    setError(!re.test(email));
  };

  const validateAge = (age: number) => setError(!(age > 18 && age < 65));

  console.log("prop questuon", props);
  const handleValidation = (value: string | number, type: string) => {
    switch (type) {
      case "email":
        validateEmail(value as string);
        break;
      case "number":
        validateAge(value as number);
        break;
      default:
        console.log("incorrect value");
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
          onChange={(event) =>
            handleValidation(event.target.value, expected.type)
          }
          onBlur={(event) => {
            handleValidation(event.target.value, expected.type);
          }}
          placeholder={expected.placeholder}
          onKeyUp={(event) => {
            if (event.keyCode === 13) {
              console.log("hello on submit working");
              props.handleSubmitAnswer(event.currentTarget.value);
            }
          }}
        />
        {error ? <span>Invalid {expected.placeholder}</span> : null}
      </div>
    </div>
  );
};

export default InputForm;
