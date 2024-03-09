import { useQuiz } from "../Context/Quizcontext";

export default function Questions() {
  const { question, dispatch, userAnswer, totalQuestions, index } = useQuiz();

  return (
    <div>
      <h4>{question.question}</h4>
      <Option
        question={question[index]}
        dispatch={dispatch}
        userAnswer={userAnswer}
      />
      {userAnswer !== null && (
        <button
          className="btn btn-ui"
          onClick={() =>
            dispatch({ type: index < totalQuestions - 1 ? "next" : "finished" })
          }
        >
          {index < totalQuestions - 1 ? "Next" : "Finish Quiz"}
        </button>
      )}
    </div>
  );
}

function Option({ question, dispatch, userAnswer }) {
  return (
    <div className="options">
      {question.options.map((item, index) => (
        <button
          className={`btn btn-option ${index === userAnswer ? "answer" : ""} ${
            userAnswer !== null
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={item}
          disabled={userAnswer !== null}
          onClick={() => dispatch({ type: "onAnswer", payload: index })}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
