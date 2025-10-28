export const fetchQuiz = async (amount = 5, type = "multiple") => {
  const cached = localStorage.getItem("quizData");
  if (cached) {
    console.log("✅ Mengambil dari cache localStorage");
    return JSON.parse(cached);
  }

  try {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${amount}&type=${type}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
      throw new Error("No questions received from API");
    }


    localStorage.setItem("quizData", JSON.stringify(data.results));

    return data.results;
  } catch (error) {
    console.error("Gagal mengambil data kuis:", error);

    return [
      {
        category: "Fallback Quiz",
        type: "multiple",
        difficulty: "easy",
        question: "Contoh soal fallback: 2 + 2 = ?",
        correct_answer: "4",
        incorrect_answers: ["2", "3", "5"],
      },
    ];
  }
};
