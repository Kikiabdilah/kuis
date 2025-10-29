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

  // ✅ Jika semua soal sudah dijawab, tampilkan hasil akhir
  if (!currentQuestion) {
    const correctCount = answers.filter((a) => a.isCorrect).length;
    const wrongCount = answers.length - correctCount;

    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <div className="bg-white p-6 rounded-2xl shadow-md text-center max-w-sm w-full">
          <h1 className="text-2xl font-semibold mb-3">Kuis Selesai </h1>
          <p className="mb-1">Total Soal: {totalQuestions}</p>
          <p className="text-green-600 font-medium">Benar: {correctCount}</p>
          <p className="text-red-600 font-medium mb-4">Salah: {wrongCount}</p>

          <button
            onClick={() => {
              localStorage.removeItem("quizData");
              window.location.reload();
            }}
            className="mt-3 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Ulangi Kuis
          </button>
        </div>
      </div>
    );
  }

  // ✅ Jika kuis masih berlangsung
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

        {/* Progress bar */}
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
