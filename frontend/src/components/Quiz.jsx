import { useEffect, useState } from "react";
import api from "../api";

export default function Quiz({ lessonId }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    api.get(`/questions/?lesson=${lessonId}`).then((res) => setQuestions(res.data));
  }, [lessonId]);

  const handleAnswer = (qId, option) => {
    setAnswers({ ...answers, [qId]: option });
  };

  const submitQuiz = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct_option) correct++;
    });
    setScore(correct);
  };

  return (
    <div className="p-4 space-y-4">
      {questions.map((q) => (
        <div key={q.id} className="border p-4 rounded">
          <p className="font-semibold">{q.question_text}</p>
          {["option_a", "option_b", "option_c", "option_d"].map((opt) => (
            <label key={opt} className="block">
              <input
                type="radio"
                name={`q${q.id}`}
                onChange={() => handleAnswer(q.id, q[opt])}
              />{" "}
              {q[opt]}
            </label>
          ))}
        </div>
      ))}
      <button onClick={submitQuiz} className="bg-indigo-600 text-white px-4 py-2 rounded">
        Submit
      </button>
      {score !== null && <p>Your score: {score}/{questions.length}</p>}
    </div>
  );
}
