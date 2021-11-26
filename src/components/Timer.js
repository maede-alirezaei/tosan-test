import React from "react";
import useTimer from "../hooks/timer";

function Timer(props) {
  const t = props.time;
  const m = t / 1000;

  let timer = null;
  const { min: minutes, sec: seconds } = useTimer(m, 0);
  timer = `${minutes}:${seconds}`;
  let enable = false;
  if (seconds === "00" && minutes === "00") {
    enable = true;
  }
  return <div>{timer}</div>;
}

export default Timer;
