import React, { useState } from "react";

function ExamQuestion(props) {
  const [checkedStates, setCheckedStates] = useState(new Array(3).fill(false));

  const handleOnChange = (event, opIndex) => {
    const updatedCheckedState = checkedStates.map((item, index) =>
      index === opIndex ? true : false
    );
    setCheckedStates(updatedCheckedState);

    props.onAnswerHandler(props.number, event.target.id);
  };
  return (
    <div>
      <span>{props.number} </span>
      <span>{props.title}</span>
      {props.answers.map((option, index) => (
        <div key={index}>
          <input
            id={option}
            type={"checkbox"}
            onChange={(e) => handleOnChange(e, index)}
            checked={checkedStates.findIndex((item) => item === true) === index}
          />
          {checkedStates.findIndex((item) => item === true)}
          <label id={option}>{option}</label>
        </div>
      ))}
    </div>
  );
}

export default ExamQuestion;
