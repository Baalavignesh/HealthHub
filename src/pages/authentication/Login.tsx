import { useDispatch } from "react-redux";
import { setTokens } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("set");
    dispatch(
      setTokens({
        accessToken: "access_token",
        refreshToken: "refresh_token",
        idToken: "id_token",
      })
    );
    navigate("/dashboard");
  };

  useEffect(() => {
    console.log('login screen');
  }, [])
  return (
    <div>
      <h1>Login Screen</h1>
      <button className="p-4 rounded-sm bg-primary" onClick={handleLogin}>
        Set Access Token
      </button>
    </div>
  );
};

export default Login;
