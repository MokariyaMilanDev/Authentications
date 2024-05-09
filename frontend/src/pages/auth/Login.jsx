import { Link, useNavigate } from "react-router-dom";
import "../../styles/login.css";
import { useState } from "react";
import LoadingButton from "../../components/LoadingButton";
import { loginAPIcontroller } from "../../controllers/X_auth.controller";

function Login() {
  // -- states -- //
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [eror, setError] = useState(false);
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const _LoginHandler = async () => {
    setLoading(true);
    // check empty
    if (!gmail || !password) {
      setError(true);
      return null;
    }

    setError(false);

    const body = {
      gmail,
      password,
    };

    try {
      const res = await loginAPIcontroller(body);
      if (!res?.success) {
        setApiError(res?.message);
        setLoading(false);
        return null;
      }
      navigate(`/${res.data.username}`);
    } catch (Apierror) {
      console.log("login api error : ", Apierror);
    }

    setLoading(false);
  };

  return (
    <section className="S-login">
      <div className="form">
        {/* heading  */}
        <div className="form-heading">
          <h1>Login</h1>
          <svg
            height="56"
            viewBox="0 -960 960 960"
            width="56">
            <path
              fill="white"
              d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"
            />
          </svg>
          {eror ? <p>Please enter details</p> : ""}
          {apiError ? <p>{apiError}</p> : ""}
        </div>
        {/* Gmail */}
        <div className="field-div">
          <div className="input-div">
            <svg
              height="24"
              viewBox="0 -960 960 960"
              width="24">
              <path
                fill="#707070"
                d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"
                style={{ fill: `${gmail.length >= 1 ? "white" : "#707070"}` }}
              />
            </svg>
            <input
              type="text"
              value={gmail}
              onChange={(ele) => setGmail(ele.currentTarget.value)}
              placeholder="Gmail"
            />
          </div>
        </div>
        {/* Password */}
        <div className="field-div">
          <div className="input-div">
            <svg
              height="24"
              viewBox="0 -960 960 960"
              width="24">
              <path
                fill="#707070"
                d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"
                style={{
                  fill: `${password.length >= 1 ? "white" : "#707070"}`,
                }}
              />
            </svg>
            <input
              type="text"
              value={password}
              onChange={(ele) => setPassword(ele.currentTarget.value)}
              placeholder="Password"
            />
          </div>
        </div>
        {/* Forgot password */}
        <div className="field-div field-div-forgot">
          <Link to={"/auth/forgot-password"}>Forgot Password</Link>
        </div>
        {/* Login button  */}
        <div className="field-div">
          {loading ? (
            <LoadingButton loading={loading} />
          ) : (
            <button onClick={() => _LoginHandler()}>Login</button>
          )}
        </div>
        {/* or & hr  */}
        <div className="field-div-or">
          <hr />
          <p>OR</p>
        </div>
        {/* other options  */}
        <div className="field-div-other">
          <p>
            I have not an account <Link to={"/auth/register"}>Register</Link>
          </p>
        </div>
      </div>

      <div className="other">
        <div>
          <p>You can add other informantion.</p>
        </div>
      </div>
    </section>
  );
}

export default Login;
