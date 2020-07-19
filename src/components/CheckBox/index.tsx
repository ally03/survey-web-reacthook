import React from "react";
import "./index.css";
// export interface Check {}

interface Props {
  check: boolean;
  handleCheck: (value: any) => void;
}
const CheckBox = (props: Props) => {
  return (
    <div className="suvery-checkbox">
      <input
        className="checkbox-input"
        name="Heath issue"
        type="checkbox"
        checked={props.check}
        onChange={() => {
          props.handleCheck(!props.check);
        }}
      />
      <span>Yes</span>
    </div>
  );
};

export default CheckBox;
