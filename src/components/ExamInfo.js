import { useCallback, useEffect, useState } from "react";
import Timer from "./Timer";

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
      {examInfo && <Timer time={examInfo.timeLimit} />}
      {!isLoading && !error && examInfo && (
        <div>
          <span>{examInfo.title}</span>
          <span>{examInfo.date}</span>
          <span>{examInfo.author}</span>
          <span>{examInfo.timeLimit}</span>
        </div>
      )}
    </h3>
  );
}

export default ExamInfo;
