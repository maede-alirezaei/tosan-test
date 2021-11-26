import React, { Fragment, useCallback, useEffect, useState } from "react";
import ExamInfo from "./ExamInfo";
import ExamQuestion from "./ExamQuestion";
import styles from './Body.module.css'

function Body() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [questionsInfo, setQuestionsInfo] = useState(null);
  const [answers, setAnswers] = useState([]);

  //fetching questions info

  const fetchHandler = useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/exam/questions`);
      if (!response.ok) {
        throw new Error();
      }
      const questionsData = await response.json();
      const sortedQuestions = questionsData.items.sort(function (a, b) {
        return a.number - b.number;
      });
      setQuestionsInfo(sortedQuestions);

      setIsLoading(false);
    } catch (error) {
      setError(true);
    }
  }, []);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  //handling the answers

  const answerHandler = (number, answer) => {
    let newAnswers = [...answers];
    const existingItem = answers.find((item) => item.number === number);
    if (existingItem) {
      existingItem.answer = answer;
    } else {
      newAnswers.push({ number, answer });
    }
    setAnswers(newAnswers);
  };

  //sending the answers
  const clickHandler = async () => {
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/exam/calcscore`, {
        method: "POSt",
        body: JSON.stringify({
          answers: answers,
        }),
      });
      if (!response.ok) {
        throw new Error();
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <Fragment>
      <ExamInfo />
      <div className={styles.body}>
        {!isLoading &&
          !error &&
          questionsInfo &&
          questionsInfo.map((item, index) => (
            <ExamQuestion
              key={index}
              number={item.number}
              title={item.title}
              answers={item.answers}
              onAnswerHandler={answerHandler}
            />
          ))}
        <button className={styles.button} onClick={clickHandler}>{"submit"}</button>
      </div>
    </Fragment>
  );
}

export default Body;
