import { useQuiz } from "../Context/Quizcontext";

export default function Progress() {
  const { totalMark, totalQuestions, index, points, userAnswer } = useQuiz();
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
