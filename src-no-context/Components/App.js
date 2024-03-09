import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import Progress from "./Progress";
import Timer from "./Timer";
import Finished from "./Finished";

import { useEffect, useReducer } from "react";
import "./index.css";

//we will have different status ready,isloading,error,active,finished
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

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const totalMark = state.question.reduce(
    (accum, item) => accum + item.points,
    0
  );

  const totalQuestions = state.question.length;

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
    <div className="app">
      <Header />
      <Main>
        {state.status === "loading" && <Loader />}
        {state.status === "error" && <Error />}
        {state.status === "ready" && (
          <StartScreen
            questionCount={state.question.length}
            dispatch={dispatch}
          />
        )}
        {state.status === "active" && (
          <>
            <Progress
              totalMark={totalMark}
              totalQuestions={totalQuestions}
              index={state.index}
              points={state.points}
              userAnswer={state.userAnswer}
            />
            <Questions
              question={state.question[state.index]}
              dispatch={dispatch}
              userAnswer={state.userAnswer}
              totalQuestions={totalQuestions}
              index={state.index}
            />
            <Timer remainSec={state.remainSec} dispatch={dispatch} />
          </>
        )}
        {state.status === "finished" && (
          <Finished
            points={state.points}
            totalMark={totalMark}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
