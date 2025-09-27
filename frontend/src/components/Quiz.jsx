import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";

function Quiz() {
  const { lessonId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await api.get(`/quizzes/?lesson=${lessonId}`);
        setQuestions(res.data);
      } catch (err) {
        console.error("Failed to fetch quiz questions:", err);
      }
    };
    fetchQuestions();
  }, [lessonId]);

  if (!questions.length)
    return (
      <p className="text-center mt-10 text-gray-500 text-lg font-medium">
        Loading quiz...
      </p>
    );

  const currentQuestion = questions[currentIndex];

  const handleSubmit = () => {
    if (selectedAnswer === currentQuestion.correct_option) {
      setScore((prev) => prev + 1);
    }
    setSubmitted(true);
  };

  const handleNext = () => {
    setSubmitted(false);
    setSelectedAnswer("");
    setCurrentIndex((prev) => prev + 1);
  };

  const getFeedbackMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return " Perfect score! Excellent job!";
    if (percentage >= 75) return " Great work! You did really well!";
    if (percentage >= 50) return " Good effort! Keep practicing!";
    return " Don't worry, review the lesson and try again!";
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold mb-6 text-indigo-700 text-center">
        SkillLearn Quiz
      </h1>

      {currentIndex < questions.length ? (
        <div className="bg-white shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-2xl">
          <div className="flex justify-between items-center mb-4">
            <p className="font-semibold text-gray-700">
              Question {currentIndex + 1} / {questions.length}
            </p>
            <div className="w-1/2 bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentIndex + (submitted ? 1 : 0)) / questions.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          <p className="text-lg mb-6 text-gray-800 font-medium">
            {currentQuestion.question_text}
          </p>

          <div className="space-y-3">
            {["option_a", "option_b", "option_c", "option_d"].map((opt) => {
              const isSelected = selectedAnswer === opt.toUpperCase().slice(-1);
              const isCorrect =
                submitted && isSelected && selectedAnswer === currentQuestion.correct_option;
              const isWrong =
                submitted && isSelected && selectedAnswer !== currentQuestion.correct_option;

              return (
                <label
                  key={opt}
                  className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all duration-300 font-medium text-gray-700
                    ${
                      isCorrect
                        ? "bg-green-100 border-green-500 text-green-800"
                        : isWrong
                        ? "bg-red-100 border-red-500 text-red-800"
                        : "hover:bg-indigo-50"
                    }`}
                >
                  <div>
                    <input
                      type="radio"
                      name={`question-${currentQuestion.id}`}
                      value={opt.toUpperCase().slice(-1)}
                      checked={isSelected}
                      onChange={() => setSelectedAnswer(opt.toUpperCase().slice(-1))}
                      disabled={submitted}
                      className="mr-3 accent-indigo-600"
                    />
                    {currentQuestion[opt]}
                  </div>
                  {isCorrect && <span className="font-bold"> Correct</span>}
                  {isWrong && <span className="font-bold"> Wrong</span>}
                </label>
              );
            })}
          </div>

          {submitted && selectedAnswer !== currentQuestion.correct_option && (
            <p className="mt-3 text-red-700 font-semibold">
              Correct answer: {currentQuestion.correct_option}
            </p>
          )}

          <div className="mt-6 flex justify-end">
            {!submitted ? (
              <button
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition font-semibold"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition font-semibold"
              >
                {currentIndex + 1 === questions.length ? "Finish Quiz" : "Next Question"}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center space-y-4 p-6 bg-white shadow-lg rounded-xl">
          <p className="text-2xl font-bold text-indigo-700">
            You scored {score} / {questions.length}
          </p>
          <p className="text-lg text-gray-700">{getFeedbackMessage()}</p>
          <Link
            to={`/lessons/${lessonId}`}
            className="inline-block mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition font-semibold"
          >
            Back to Lesson
          </Link>
        </div>
      )}
    </div>
  );
}

export default Quiz;












