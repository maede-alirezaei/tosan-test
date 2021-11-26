import React, { Fragment, useCallback, useEffect, useState } from "react";

function Header() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(null);
  const [examInfo, setExamInfo] = useState(null);
  const fetchHandler = useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:5000/title`);
      if (!response.ok) {
        throw new Error();
      }

      const examData = await response.json();
      setExamInfo(examData);
      console.log("error");
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
      <h1 style={{ textAlign: "center" }}>
        {!isLoading && !error && examInfo}
        {/* {"Title"} */}
      </h1>
    </Fragment>
  );
}

export default Header;
