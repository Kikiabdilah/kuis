export const fetchQuizViaProxy = async (amount = 5, type = "multiple") => {
  const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
    `https://opentdb.com/api.php?amount=${amount}&type=${type}`
  )}`;

  const response = await fetch(url);
  const data = await response.json();

  const parsed = JSON.parse(data.contents);
  return parsed.results;
};
