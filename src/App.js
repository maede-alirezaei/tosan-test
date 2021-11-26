import { Fragment, useCallback, useEffect, useState } from "react";
import Body from "./components/Body";
import Header from "./components/Header";
function App() {
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
    <Fragment>
      <Header />
      <Body />
    </Fragment>
  );
}

export default App;

