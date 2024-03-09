import { useEffect } from "react";

export default function Timer({ remainSec, dispatch }) {
  const min = Math.trunc(remainSec / 60);
  const sec = remainSec % 60;
  useEffect(
    function () {
      function dec() {
        remainSec === 0
          ? dispatch({ type: "finished" })
          : dispatch({ type: "timer" });
      }
      const id = setInterval(dec, 1000);

      return () => clearInterval(id);
    },
    [dispatch, remainSec]
  );
  return (
    <div className="timer">
      <p>
        0{min}:{sec < 10 ? `0${sec}` : sec}
      </p>
    </div>
  );
}
