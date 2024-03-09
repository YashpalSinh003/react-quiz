export default function Finished({ points, totalMark, dispatch }) {
  return (
    <div>
      <p className="result">
        <span>{points > 200 ? "🎉" : "🤔"}</span>
        {`You scored ${points} out of ${totalMark} (${Math.trunc(
          (points / totalMark) * 100
        )}%)`}
      </p>
      <p className="highscore">{`(Highscore: ${points} points)`}</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </div>
  );
}
