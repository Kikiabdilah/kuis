import { useEffect, useState } from "react";

export const useTimer = (initialTime, onTimeUp, saveProgressFn) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  // Jalankan countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp?.(); // otomatis lanjut soal jika waktu habis
      return;
    }

    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  // Simpan waktu tersisa ke localStorage (untuk resume)
  useEffect(() => {
    saveProgressFn?.(timeLeft);
  }, [timeLeft, saveProgressFn]);

  // Reset timer ke waktu awal
  const resetTimer = () => setTimeLeft(initialTime);

  return { timeLeft, resetTimer };
};
