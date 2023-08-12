export const login = (token: string) => {
  localStorage.setItem(
    "credential",
    JSON.stringify({
      token: token,
    })
  );
};
export const logout = () => {
  localStorage.removeItem("credential");
};
export const getToken = () => {
  console.log(localStorage.getItem("credential"));
  return JSON.parse(localStorage.getItem("credential") || "{}")?.token;
};
