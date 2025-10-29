
// USER
export const saveUser = (user) => {
  localStorage.setItem("quiz_user", JSON.stringify(user));
};

export const getUser = () => {
  try {
    const user = localStorage.getItem("quiz_user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

export const clearUser = () => {
  localStorage.removeItem("quiz_user");
};

//  PROGRESS
export const saveProgress = (data) => {
  try {
    localStorage.setItem("quizProgress", JSON.stringify(data));
  } catch (err) {
    console.error("Gagal menyimpan progress:", err);
  }
};

export const loadProgress = () => {
  try {
    const saved = localStorage.getItem("quizProgress");
    return saved ? JSON.parse(saved) : null;
  } catch {
    return null;
  }
};

export const clearProgress = () => {
  localStorage.removeItem("quizProgress");
  localStorage.removeItem("quizData");
};
