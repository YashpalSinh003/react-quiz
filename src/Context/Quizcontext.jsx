import { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
  question: [],
  status: "loading",
  index: 0,
  userAnswer: null,
  points: 0,
  remainSec: 300,
};

function reducer(state, action) {
  switch (action.type) {
    case "ready":
      return { ...state, question: action.payload, status: "ready" };
    case "error":
      return { ...state, status: "error" };
    case "active":
      return { ...state, status: "active" };
    case "onAnswer":
      return {
        ...state,
        userAnswer: action.payload,
        points:
          state.question[state.index]["correctOption"] === action.payload
            ? state.points + state.question[state.index].points
            : state.points,
      };
    case "next":
      return { ...state, index: state.index + 1, userAnswer: null };
    case "finished":
      return { ...state, status: "finished" };
    case "timer":
      return { ...state, remainSec: state.remainSec - 1 };
    case "restart":
      return {
        ...initialState,
        status: "ready",
        question: state.question,
      };
    default:
      throw new Error("Action Unknown");
  }
}
const QuizProvider = createContext();

function QuizContext({ children }) {
  const [{ question, index, status, userAnswer, points, remainSec }, dispatch] =
    useReducer(reducer, initialState);

  const totalMark = question.reduce((accum, item) => accum + item.points, 0);

  const totalQuestions = question.length;

  useEffect(function () {
    async function getData() {
      try {
        const res = await fetch("http://localhost:9000/questions");
        const data = await res.json();
        dispatch({ type: "ready", payload: data });
      } catch (err) {
        dispatch({ type: "error" });
      }
    }
    getData();
  }, []);

  return (
    <QuizProvider.Provider
      value={{
        question,
        index,
        status,
        userAnswer,
        points,
        remainSec,
        totalQuestions,
        totalMark,
        dispatch,
      }}
    >
      {children}
    </QuizProvider.Provider>
  );
}

function useQuiz() {
  const value = useContext(QuizProvider);
  if (value === undefined)
    throw new Error("Context is read before context provider");
  return value;
}

export { QuizContext, useQuiz };
