export default function QuizHeader(
  { currentIndex,
    totalQuestions,
    answersCount,
    timeLeft
  })
  {
  return (
    <>
      <div className="flex justify-between mb-2 text-gray-600 text-sm">
        <span>Soal {currentIndex + 1} dari {totalQuestions}</span>
        <span>Sudah dijawab: {answersCount}</span>
      </div>

      <div className="w-full bg-gray-200 h-2 rounded-full mb-4">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
          style={{
            width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
          }}
        ></div>
      </div>

      <div className="flex justify-end mb-2 text-sm text-gray-500">
        ⏱ Waktu tersisa:
        <span className="ml-1 text-blue-600 font-semibold">{timeLeft}s</span>
      </div>
    </>
  );
}
