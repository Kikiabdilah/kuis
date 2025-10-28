// src/pages/QuizPage.jsx
import { useQuiz } from "../hooks/useQuiz";

export default function QuizPage() {
  const {
    questions,
    currentQuestion,
    currentIndex,
    totalQuestions,
    answers,
    loading,
    error,
    handleAnswer,
  } = useQuiz();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Memuat soal...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <h1 className="text-2xl font-semibold mb-2">Kuis Selesai 🎉</h1>
        <p>Kamu telah menjawab semua {totalQuestions} soal.</p>
        <button
          onClick={() => {window.location.reload()
          localStorage.removeItem("quizData");
          }}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          Mulai Ulang
        </button>
      </div>
    );
  }

  const answersList = [
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ].sort(() => Math.random() - 0.5);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-md max-w-xl w-full">
        <div className="flex justify-between mb-2 text-gray-600 text-sm">
          <span>
            Soal {currentIndex + 1} dari {totalQuestions}
          </span>
          <span>Sudah dijawab: {answers.length}</span>
        </div>

        <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
          <div
            className="bg-blue-500 h-2 rounded-full"
            style={{
              width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
            }}
          ></div>
        </div>

        <h1
          className="text-lg font-semibold mb-4"
          dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
        />

        <div className="space-y-2">
          {answersList.map((ans, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(ans)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
              dangerouslySetInnerHTML={{ __html: ans }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
