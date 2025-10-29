import { useEffect, useState } from "react";
import { fetchQuizViaProxy as fetchQuiz } from "../api/proxyQuiz";

export const useQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Coba muat data kuis dari localStorage
  useEffect(() => {
    const saved = localStorage.getItem("quizProgress");
    if (saved) {
      const parsed = JSON.parse(saved);
       const isFinished =
      parsed.currentIndex >= (parsed.questions?.length || 0);

      if(!isFinished){
        setQuestions(parsed.questions || []);
        setCurrentIndex(parsed.currentIndex || 0);
        setAnswers(parsed.answers || []);
        setLoading(false);
        return;
      }else{
        localStorage.removeItem("quizProgress");
      }
    }

    // Kalau tidak ada data tersimpan, ambil dari API
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

  // Simpan progres ke localStorage setiap kali berubah
  useEffect(() => {
    if (questions.length === 0) return;

    localStorage.setItem(
      "quizProgress",
      JSON.stringify({
        questions,
        currentIndex,
        answers,
      })
    );
  }, [questions, currentIndex, answers]);

  // Fungsi saat user menjawab
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

  const currentQuestion = questions[currentIndex] || null;

  return {
    questions,
    currentQuestion,
    currentIndex,
    totalQuestions: questions.length,
    answers,
    loading,
    error,
    handleAnswer,
  };
};
