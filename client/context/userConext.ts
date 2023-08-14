export const login = (token: string, name: string) => {
  localStorage.setItem(
    "credential",
    JSON.stringify({
      token: token,
      name,
    })
  );
};
export const logout = () => {
  localStorage.removeItem("credential");
};
export const getToken = () => {
  return JSON.parse(localStorage.getItem("credential") || "{}")?.token;
};
