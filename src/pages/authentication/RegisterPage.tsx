// Import necessary dependencies
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorRegisterForm from "../../components/DoctorRegisterForm";
import UserRegisterForm from "../../components/UserRegisterForm";

// Define the functional component
const SignUpForm = () => {
  const navigate = useNavigate();

  const [doctorRegister, setDoctorRegister] = useState<boolean>(false);

  const handleSwitchUserType = () => {
    setDoctorRegister(!doctorRegister);
  };

  return (
    <div className="min-h-screen  flex justify-center items-center gradiant-background">
      <div className="ml-16 w-1/2 bg-white rounded-md  h-full">
        <h1 className="p-4">Welcome to HealthHub</h1>
        <h4 className="w-96 p-4">
          Best destination to book an appointment and stay updated about health
          information in your area
        </h4>

        <div>
          <button
            className="bg-custom-black p-4 rounded-md m-4"
            onClick={handleSwitchUserType}
          >
            Registration for {doctorRegister ? "User" : "Doctor"}
          </button>
        </div>
      </div>

      {doctorRegister ? (
        <div className=" mr-8 w-1/2 p-6 bg-white rounded-md shadow-md h-full">
          <h2 className="text-2xl font-semibold mb-4">Sign Up - Doctor</h2>

          <DoctorRegisterForm />
          <p className="p-4 text-center mt-4">
            Already a user? &nbsp;
            <span
              className="text-custom-black cursor-pointer"
              onClick={() => {
                navigate("/login");
                console.log("nagivagte to login page");
              }}
            >
              Login here
            </span>
          </p>
        </div>
      ) : (
        <div className=" mr-8 w-1/2 p-6 bg-white rounded-md shadow-md h-full">
          <h2 className="text-2xl font-semibold mb-4">Sign Up - User</h2>
          <UserRegisterForm />

          <p className="p-4 text-center mt-4">
            Already a user? &nbsp;
            <span
              className="text-custom-black cursor-pointer"
              onClick={() => {
                console.log("nagivagte to login page");
                navigate("/login");
              }}
            >
              Login here
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
