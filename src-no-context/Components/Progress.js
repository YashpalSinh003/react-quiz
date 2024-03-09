export default function Progress({
  totalMark,
  totalQuestions,
  index,
  points,
  userAnswer,
}) {
  return (
    <header className="progress">
      <progress
        max={totalQuestions}
        value={index + Number(userAnswer !== null)}
      />
      <p>
        {index + 1}/{totalQuestions}
      </p>
      <p>
        {points}/{totalMark}
      </p>
    </header>
  );
}
