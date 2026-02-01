const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
};

const setToken = (token: string) => {
  localStorage.setItem("access_token", token);
};

const clearToken = () => {
  localStorage.removeItem("access_token");
};

export {
  getToken,
  setToken,
  clearToken,
};