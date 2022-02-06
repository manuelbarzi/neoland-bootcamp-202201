function unregisterUser(token, password) {
  validateToken(token);
  validatePassword(password);

  return fetch("https://b00tc4mp.herokuapp.com/api/v2/users", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ password }),
  }).then((res) => {
    const { status } = res;

    if (status === 204) return;
    else if (status >= 400 && status < 500) {
      return res.json().then(({ error }) => {
        throw new Error(error);
      });
    } else if (status >= 500) throw new Error("server error");
    else throw new Error("unknown error");
  });
}
