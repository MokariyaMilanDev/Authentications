import { useNavigate, useParams } from "react-router-dom";
import "../../styles/user.css";
import userAPIcontroller from "../../controllers/X_user.controller";
import { useEffect, useState } from "react";

function User() {
  const navigate = useNavigate();
  const params = useParams();
  const [useData, setUserData] = useState("");

  const _UserHandler = async () => {
    const userApiResponse = await userAPIcontroller(params.username);

    if (!userApiResponse?.success) {
      navigate("/auth/login");
    }

    setUserData(userApiResponse?.data?.User);
  };

  useEffect(() => {
    _UserHandler();
  }, []);

  return (
    <section className="S-user">
      <h1>User Home Page</h1>
      <h2>Username : {useData?.username}</h2>
    </section>
  );
}

export default User;