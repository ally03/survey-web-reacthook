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
  //   handleInputChange: void;
  //   answer: string | number;
}

const InputForm = (props: Props) => {
  const [singleObject, setSingleObject] = useState({});
  console.log("alal");
  console.log("prop questuon", props);
  return (
    <div>
      <h1>{props.survey.question}</h1>
      <div className="">
        <input
          type="email"
          // value={this.state.email}
          // onChange={this.handleEmailChange}
          placeholder={props.survey.expected.placeholder}
          onKeyUp={(event) => {
            if (event.keyCode === 13) {
              console.log("hello on submit working");
              props.handleSubmitAnswer(event.currentTarget.value);
            }
          }}
          //   onSubmit={() => handleInputChange}
        />
        <span>Invalid e-mail address</span>
      </div>
    </div>
  );
};

export default InputForm;
