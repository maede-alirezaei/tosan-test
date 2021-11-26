import { useEffect, useState } from "react";

const useTimer = (initMin, initSec) => {
  const initialMinute = initMin;
  const initialSeconds = initSec;

  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    setTimeout(
      () => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }

        if (seconds === 0) {
          if (minutes === 0) {
            return () => {};
          } else {
            setSeconds(59);
            setMinutes(minutes - 1);
          }
        }
      },

      1000
    );

    return () => {};
  }, [minutes, seconds]);
  let zero = "";
  if (seconds < 10) {
    zero = "0";
  }

  return { sec: `${zero}${seconds}`, min: `${minutes}` };
};

export default useTimer;
