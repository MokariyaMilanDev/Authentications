import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "../../components/LoadingButton";
import { regitserAPIcontroller } from "../../controllers/X_auth.controller";

function Register() {
  // -- states -- //
  const [username, setUsername] = useState("");
  const [gmail, setGmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(true);
  const [eror, setError] = useState(false);
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // -- handlers -- //
  const _RegisterHandler = async () => {
    setLoading(true);

    // check empty
    if (
      !username ||
      !gmail ||
      !phone ||
      !password ||
      !confirmPassword ||
      !terms
    ) {
      setError(true);
      setLoading(false);
      return null;
    }

    // compare both password
    if (password !== confirmPassword) {
      setError(true);
      setLoading(false);
      return null;
    }

    // #1 check gmail
    if (!gmail.includes("@") || !gmail.includes(".")) {
      setError(true);
      setLoading(false);
      return null;
    }

    // #3 check phone number
    if (phone.toString().length !== 10) {
      setError(true);
      setLoading(false);
      return null;
    }

    setError(false);

    const body = {
      username,
      gmail,
      phone,
      password,
      confirmPassword,
    };

    try {
      const res = await regitserAPIcontroller(body);
      if (!res?.success) {
        setApiError(res.message);
        setLoading(false);
        return null;
      }

      navigate("/auth/login");
    } catch (Apierror) {
      setApiError(Apierror);
      console.log("register api error : ", Apierror);
    }

    setLoading(false);
  };

  return (
    <section className="S-login">
      <div className="form">
        {/* heading  */}
        <div className="form-heading">
          <h1>Register</h1>
          <svg height="56" viewBox="0 -960 960 960" width="56">
            <path
              fill="white"
              d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"
            />
          </svg>
          {eror ? <p>Please enter details</p> : ""}
          {apiError ? <p>{apiError}</p> : ""}
        </div>
        {/* Username  */}
        <div className="field-div">
          <div className="input-div">
            <svg height="24" viewBox="0 -960 960 960" width="24">
              <path
                fill="#707070"
                d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"
                style={{
                  fill: `${username.length >= 1 ? "white" : "#707070"}`,
                }}
              />
            </svg>
            <input
              type="text"
              value={username}
              onChange={(ele) => setUsername(ele.currentTarget.value)}
              placeholder="Username"
            />
          </div>
        </div>
        {/* Gmail  */}
        <div className="field-div">
          <div className="input-div">
            <svg height="20" viewBox="0 0 512 512">
              <path
                fill={"#707070"}
                d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
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
        {/* Phone  */}
        <div className="field-div">
          <div className="input-div">
            <svg height="24" viewBox="0 -960 960 960" width="24">
              <path
                fill="#707070"
                d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"
                style={{ fill: `${phone.length >= 1 ? "white" : "#707070"}` }}
              />
            </svg>
            <input
              type="text"
              value={phone}
              onChange={(ele) => setPhone(ele.currentTarget.value)}
              placeholder="Phone"
            />
          </div>
        </div>
        {/* Password */}
        <div className="field-div">
          <div className="input-div">
            <svg height="24" viewBox="0 -960 960 960" width="24">
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
        {/* Confirm password */}
        <div className="field-div">
          <div className="input-div">
            <svg height="24" viewBox="0 -960 960 960" width="24">
              <path
                fill="#707070"
                d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"
                style={{
                  fill: `${confirmPassword.length >= 1 ? "white" : "#707070"}`,
                }}
              />
            </svg>
            <input
              type="text"
              value={confirmPassword}
              onChange={(ele) => setConfirmPassword(ele.currentTarget.value)}
              placeholder="confirm Password"
            />
          </div>
        </div>
        {/* Terms & Conditions */}
        <div className="field-div-check">
          <input
            type="checkbox"
            name=""
            id=""
            defaultChecked
            onClick={(ele) => setTerms(ele.currentTarget.checked)}
          />
          Agree with <Link>Terms & Conditions</Link>
        </div>
        {/* Register button  */}
        <div className="field-div">
          {loading ? (
            <LoadingButton loading={loading} />
          ) : (
            <button onClick={() => _RegisterHandler()}>Register</button>
          )}
        </div>
        {/* or & hr  */}
        <div className="field-div-or">
          <hr />
          <p>OR</p>
        </div>

        <div className="field-div-other">
          <p>
            I have already an account <Link to={"/auth/login"}>Login</Link>
          </p>
        </div>
      </div>

      <div className="other">
        <div>
          <p>You can add other informantion</p>
        </div>
      </div>
    </section>
  );
}

export default Register;
