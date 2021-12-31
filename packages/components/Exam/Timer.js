/** @format */

import React, { useState, useEffect } from 'react';

const Timer = (props) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(props.finishDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval, idx) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={idx}>
        {idx === 1 ? '0' : null}
        {timeLeft[interval]}
        {idx < 3 ? ':' : null}
      </span>
    );
  });
  return <h5>{timerComponents.length ? timerComponents : <span>Timpul s-a terminat!</span>}</h5>;
};

export default Timer;
