import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Questions from "./Questions";
import Progress from "./Progress";
import Timer from "./Timer";
import Finished from "./Finished";
import { useQuiz } from "../Context/Quizcontext";

export default function Main() {
  const { status } = useQuiz();
  return (
    <div className="main">
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "ready" && <StartScreen />}
      {status === "active" && (
        <>
          <Progress />
          <Questions />
          <Timer />
        </>
      )}
      {status === "finished" && <Finished />}
    </div>
  );
}
