import { useCallback, useEffect, useState } from "react";
import Timer from "./Timer";
import styles from './Body.module.css'
function ExamInfo() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [examInfo, setExamInfo] = useState(null);

  const fetchHandler = useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/exam/info`);
      if (!response.ok) {
        throw new Error();
      }
      const examData = await response.json();
      setExamInfo(examData);

      setIsLoading(false);
    } catch (error) {
      setError(true);
    }
  }, []);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  return (
    <h3>
      {!isLoading && !error && examInfo && (
        <div className={styles['exam-info']}>
          <span>{examInfo.author}</span>
          <span>{examInfo.title}</span>
          <span>{examInfo.date.substring(0,15)}</span>
        </div>
      )}
      {examInfo && <Timer time={examInfo.timeLimit} />}
    </h3>
  );
}

export default ExamInfo;
