import { useEffect, useState } from "react";
import { fetchQuizViaProxy as fetchQuiz } from "../api/proxyQuiz";

export const useQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadQuiz = async () => {
      setLoading(true);
      setError("");

      const data = await fetchQuiz(5, "multiple");

      if (data.length === 0) {
        setError("Tidak ada soal yang bisa ditampilkan.");
      }

      setQuestions(data);
      setLoading(false);
    };

    loadQuiz();
  }, []);

  const handleAnswer = (selectedAnswer) => {
    if (!questions[currentIndex]) return;

    const currentQuestion = questions[currentIndex];
    const isCorrect = selectedAnswer === currentQuestion.correct_answer;

    setAnswers((prev) => [
      ...prev,
      {
        question: currentQuestion.question,
        selectedAnswer,
        correctAnswer: currentQuestion.correct_answer,
        isCorrect,
      },
    ]);

    setCurrentIndex((prev) => prev + 1);
  };

  // ✅ Hitung hasil akhir
  const getResults = () => {
    const correct = answers.filter((a) => a.isCorrect).length;
    const incorrect = answers.length - correct;
    const total = answers.length;
    return { correct, incorrect, total };
  };

  // 🔁 Reset kuis (opsional)
  const resetQuiz = () => {
    setQuestions([]);
    setAnswers([]);
    setCurrentIndex(0);
    localStorage.removeItem("quizData_multiple_5"); // hapus cache agar ambil soal baru
    window.location.reload();
  };

  const currentQuestion = questions[currentIndex] || null;

  return {
    questions,
    currentQuestion,
    currentIndex,
    totalQuestions: questions.length,
    answers,
    answeredCount: answers.length,
    loading,
    error,
    handleAnswer,
    getResults,
    resetQuiz,
  };
};
