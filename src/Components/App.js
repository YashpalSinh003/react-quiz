import Header from "./Header";
import Main from "./Main";

import { QuizContext } from "../Context/Quizcontext";

import "./index.css";

//we will have different status ready,isloading,error,active,finished
// const initialState = {
//   question: [],
//   status: "loading",
//   index: 0,
//   userAnswer: null,
//   points: 0,
//   remainSec: 300,
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case "ready":
//       return { ...state, question: action.payload, status: "ready" };
//     case "error":
//       return { ...state, status: "error" };
//     case "active":
//       return { ...state, status: "active" };
//     case "onAnswer":
//       return {
//         ...state,
//         userAnswer: action.payload,
//         points:
//           state.question[state.index]["correctOption"] === action.payload
//             ? state.points + state.question[state.index].points
//             : state.points,
//       };
//     case "next":
//       return { ...state, index: state.index + 1, userAnswer: null };
//     case "finished":
//       return { ...state, status: "finished" };
//     case "timer":
//       return { ...state, remainSec: state.remainSec - 1 };
//     case "restart":
//       return {
//         ...initialState,
//         status: "ready",
//         question: state.question,
//       };
//     default:
//       throw new Error("Action Unknown");
//   }
// }

export default function App() {
  return (
    <QuizContext>
      <div className="app">
        <Header />
        <Main />
      </div>
    </QuizContext>
  );
}
