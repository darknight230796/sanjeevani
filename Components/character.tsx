import * as React from "react";
import { useState, useEffect, useRef } from "react";
const roundOffAdd = (n: number) => {
  return Math.round((n + 1 / 3) * 1e2) / 1e2;
};
const roundOffSub = (n: number) => {
  return Math.round((n - 1 / 3) * 1e2) / 1e2;
};

const MIN_BOTTOM = 10;

let leftInterval: string | number | NodeJS.Timer,
  rightInterval: string | number | NodeJS.Timer,
  jumpInterval: string | number | NodeJS.Timer;

const Character = () => {
  const [left, setLeft] = useState(10);
  const [bottom, setBottom] = useState(MIN_BOTTOM);

  const handleDown = () => {
    let b: number;
    const interval = setInterval(() => {
      setBottom((prev) => {
        b = prev;
        return roundOffSub(prev);
      });
      if (b - MIN_BOTTOM < 1 / 3) {
        setBottom(MIN_BOTTOM);
        clearInterval(interval);
        jumpInterval = undefined;
      }
    }, 100 / 3);
  };

  const handleJump = () => {
    let count = 0;
    if (!jumpInterval) {
      jumpInterval = setInterval(() => {
        setBottom((prev) => roundOffAdd(prev));
        count++;
        if (count === 30) {
          clearInterval(jumpInterval);
          handleDown();
        }
      }, 100 / 3);
    }
  };

  const keyDownHandler = (event: any) => {
    switch (event.code) {
      case "KeyA":
        if (!leftInterval) {
          leftInterval = setInterval(() => {
            setLeft((prevLeft) => roundOffSub(prevLeft));
          }, 100 / 3);
        }
        return;
      case "KeyD":
        if (!rightInterval) {
          rightInterval = setInterval(() => {
            setLeft((prevLeft) => roundOffAdd(prevLeft));
          }, 100 / 3);
        }
        return;
      case "Space":
        if (!jumpInterval) {
          handleJump();
        }
        return;
    }
  };

  const keyUpHandler = (event: any) => {
    switch (event.code) {
      case "KeyA":
        clearInterval(leftInterval);
        leftInterval = undefined;
        return;
      case "KeyD":
        clearInterval(rightInterval);
        rightInterval = undefined;
        return;
    }
  };

  const inputReference = useRef(null);

  useEffect(() => {
    inputReference.current.focus();
  }, []);

  return (
    <div
      style={{
        height: "5%",
        width: "1%",
        left: `${left}%`,
        bottom: `${bottom}%`,
        backgroundColor: "black",
        position: "absolute",
      }}
      onKeyDown={keyDownHandler}
      onKeyUp={keyUpHandler}
      tabIndex={0}
      ref={inputReference}
    ></div>
  );
};

export default Character;
