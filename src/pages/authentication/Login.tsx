import { useDispatch } from "react-redux";
import { setTokens } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {

    console.log('Login Information:', loginInfo);

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

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    console.log('login screen');
  }, [])
  return (
    <div className="flex justify-center items-center h-screen">
    <div className="w-1/2 mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h1>Welcome Back</h1>
      <h2 className="text-2xl font-medium mb-4 mt-4">Login</h2>
      <form>
        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={(e) => setLoginInfo({ ...loginInfo, email: e.target.value })}
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 p-2 w-full border rounded-md"
            onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
          />
        </div>

        {/* Login Button */}
        <button
          type="button"
          className="bg-blue-500 text-white rounded-md hover:bg-blue-600 bg-primary mt-4 p-4 w-full text-custom-white"
          onClick={handleLogin}
        >
          Login
        </button>
      </form>

      <p className="p-4 text-center mt-4">
              New here? &nbsp;
              <span
                className="text-custom-black cursor-pointer"
                onClick={() => {
                  console.log("nagivagte to login page");
                  navigate("/register")
                }}
              >
                Register Now
              </span>
            </p>
    </div>
    </div>
  );
};

export default Login;


