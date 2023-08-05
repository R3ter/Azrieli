export const login = (token) => {
    console.log(token)
  localStorage.setItem(
    "credential",
    JSON.stringify({
      token: token,
    })
  );
};
