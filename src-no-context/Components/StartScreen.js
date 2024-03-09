export default function StartScreen({ questionCount, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to the react quiz!</h2>
      <h3>{questionCount} questions to test your react mastery</h3>
      <button className="btn" onClick={() => dispatch({ type: "active" })}>
        Let's Start
      </button>
    </div>
  );
}
