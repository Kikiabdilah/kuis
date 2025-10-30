import { clearProgress } from "../utils/storage";

export default function QuizResult({ totalQuestions, answers }) {
  const correctCount = answers.filter((a) => a.isCorrect).length;
  const wrongCount = answers.length - correctCount;

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center bg-gray-200">
      <div className="bg-white p-6 rounded-2xl shadow-md text-center max-w-sm w-full">
        <h1 className="text-5xl font-bold mb-4">Kuis Selesai</h1>
        <p className="text-2xl mb-2">Total Soal: {totalQuestions}</p>
        <p className="text-green-600 text-2xl">Benar: {correctCount}</p>
        <p className="text-red-500 text-2xl mb-4">Salah: {wrongCount}</p>

<div className="flex justify-between p-3 m-3">
        <button
          onClick={() => {
            clearProgress();
            window.location.reload();
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Ulangi Kuis
        </button>
        <button className="ml-4 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md" onClick={() => {
          clearProgress();
          window.location.href = "/home";
        }}>
        Beranda
        </button>
</div>
      </div>
    </div>
  );
}
