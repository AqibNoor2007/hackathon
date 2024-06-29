export const getToken = (key = "uid") => {
  return JSON.parse(localStorage.getItem(key));
};

export const setToken = (token, key = "uid") => {
  return localStorage.setItem(key, JSON.stringify(token));
};

export const removeToken = (key = "Q100_Token") => {
  return localStorage.removeItem(key);
};

const DIVISIONS = [
  { amount: 60, name: "seconds" },
  { amount: 60, name: "minutes" },
  { amount: 24, name: "hours" },
  { amount: 7, name: "days" },
  { amount: 4.34524, name: "weeks" },
  { amount: 12, name: "months" },
  { amount: Number.POSITIVE_INFINITY, name: "years" },
];

const formatter = new Intl.RelativeTimeFormat(undefined, {
  numeric: "auto",
  style: "narrow",
});

export const formatTimeAgo = (date) => {
  let duration = (new Date(date) - new Date()) / 1000;

  for (let i = 0; i < DIVISIONS.length; i++) {
    const division = DIVISIONS[i];
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.name);
    }
    duration /= division.amount;
  }
};

export const formatDate = (dateString) => {
  const options = { month: "short", day: "numeric", year: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};
