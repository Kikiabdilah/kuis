import React, { useEffect, useState } from "react";
import { useQuiz } from "../hooks/useQuiz";
import { useTimer } from "../hooks/useTimer";
import QuizHeader from "../components/QuizHeader";
import QuizQuestion from "../components/QuizQuestion";
import QuizResult from "../components/QuizResult";
import { loadProgress, saveProgress } from "../utils/storage";

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

  const saved = loadProgress();
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  // Tentukan waktu awal:
  // - Jika user masih di soal yang sama → lanjutkan waktu terakhir
  // - Jika soal sudah berubah / baru → mulai lagi dari 15 detik
  const initialTime =
    saved && saved.currentIndex === currentIndex
      ? saved.timeLeft ?? 15
      : 15;

  // Gunakan hook timer
  const { timeLeft, resetTimer } = useTimer(
    initialTime,
    () => handleAnswer(null), // waktu habis -> lanjut otomatis
    (timeLeft) =>
      saveProgress({
        questions,
        currentIndex,
        answers,
        timeLeft,
      })
  );

  // Reset timer setiap pindah soal
  useEffect(() => {
    resetTimer();
  }, [currentQuestion]);

  // Acak urutan jawaban setiap pindah soal
  useEffect(() => {
    if (!currentQuestion) return;
    const shuffled = [
      ...currentQuestion.incorrect_answers,
      currentQuestion.correct_answer,
    ].sort(() => Math.random() - 0.5);
    setShuffledAnswers(shuffled);
  }, [currentQuestion]);

  // Loading & Error state
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Memuat soal...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );

  // Jika kuis selesai
  if (!currentQuestion) {
    return <QuizResult totalQuestions={totalQuestions} answers={answers} />;
  }

  // Tampilan utama kuis
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-2xl shadow-md max-w-xl w-full">
        <QuizHeader
          currentIndex={currentIndex}
          totalQuestions={totalQuestions}
          answersCount={answers.length}
          timeLeft={timeLeft}
        />

        <QuizQuestion
          question={currentQuestion}
          answers={shuffledAnswers}
          onAnswer={handleAnswer}
        />
      </div>
    </div>
  );
}
