import { useDispatch } from "react-redux";
import { setTokens } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import LoginUser from "../../services/Login";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  interface LoginCredentials {
    email: string;
    password: string;
    type: string;
  }

  let [errorMessage] = useState<string>();

  const {
    register: loginRegister,
    handleSubmit: handleLogin,
    // watch: watchLogin,
    // formState: { errors: errorsLogin },
  } = useForm<LoginCredentials>();

  const onSubmit: SubmitHandler<LoginCredentials> = async (data) => {
    console.log(data);
    let response = await LoginUser(data);
    console.log(response.data);

    if (response.status == 200) {
      dispatch(
        setTokens({
          userInformation: response.data,
          userType: data.type
        })
      );
      localStorage.setItem("user", response.data);
      localStorage.setItem("usertype", data.type);
      navigate("/dashboard");
    } else {
      console.log('auth failed')
      // setErrorMessage("Please check the email and password")
    }
  };

  useEffect(() => {
    console.log("login screen");
    console.log(errorMessage)
  }, [errorMessage]);
  return (
    <div className="flex justify-center items-center h-screen gradiant-background">
      <div className="w-1/2 mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
        <h1>Welcome Back</h1>
        <h2 className="text-2xl font-medium mb-4 mt-4">Login</h2>
        <form onSubmit={handleLogin(onSubmit)}>
          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 w-full border rounded-md"
              {...loginRegister("email")}
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 w-full border rounded-md"
              {...loginRegister("password")}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="User"
              className="block text-sm font-medium text-gray-600"
            >
              User Type
            </label>
            <div className="mt-1">
              <input
                type="radio"
                id="doctor"
                // name="user"
                value="User"
                className="mr-2"
                {...loginRegister("type")}
              />
              <label htmlFor="Doctor" className="inline-block">
                User
              </label>

              <input
                type="radio"
                id="female"
                // name="type"
                value="Doctor"
                className="ml-4 mr-2"
                {...loginRegister("type")}
              />
              <label htmlFor="female" className="inline-block">
                Doctor
              </label>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md hover:bg-blue-600 bg-primary mt-4 p-4 w-full text-custom-white"
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
              navigate("/register");
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
