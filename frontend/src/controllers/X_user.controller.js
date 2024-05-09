const userAPIcontroller = async (username) => {
  var res;
  // console.log("username (X_user.controller.jsx) : ", username);

  await fetch(`http://localhost:8000/${username}`, {
    method: "post",
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
      console.log("client login error (X_user.controller.js) ::: ", error);
      return null;
    });

  return res;
};

export default userAPIcontroller;
