export const loginAPIcontroller = async (body) => {
  var res;

  await fetch("http://localhost:8000/auth/login", {
    method: "post",
    body: JSON.stringify(body),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((body) => {
      res = body;
    })
    .catch((error) => {
      console.log("login error ::: ", error);
      return null;
    });

  return res;
};

export const regitserAPIcontroller = async (body) => {
  var res;

  await fetch("http://localhost:8000/auth/register", {
    method: "post",
    body: JSON.stringify(body),
    credentials: "omit",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((body) => {
      res = body;
    })
    .catch((error) => {
      console.log("register error ::: ", error);
      return null;
    });

  return res;
};
