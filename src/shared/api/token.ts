const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
};

const setToken = (token: string) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem("access_token", token);
  } catch (error) {
    console.error("Failed to set access_token in localStorage", error);
  }
};
const clearToken = () => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem("access_token");
  } catch (error) {
    console.error("Failed to clear access_token from localStorage", error);
  }
}

export {
  getToken,
  setToken,
  clearToken,
};