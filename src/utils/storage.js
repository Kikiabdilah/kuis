
export const saveUser = (user) => {
  localStorage.setItem("quiz_user", JSON.stringify(user));
};

export const getUser = () => {
  const user = localStorage.getItem("quiz_user");
  return user ? JSON.parse(user) : null;
};

export const clearUser = () => {
  localStorage.removeItem("quiz_user");
};
