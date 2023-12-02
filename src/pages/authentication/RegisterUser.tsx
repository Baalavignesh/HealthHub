// Import necessary dependencies
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Define the interface for user information
interface UserInfo {
  name: string;
  location: string;
  contactNumber: string;
  age: number;
  gender: string;
}

interface DoctorInfo {
  name: string;
  location: string;
  contactNumber: string;
  specialization: string;
  hospitalname: string;
}

// Define the functional component
const SignUpForm = () => {
  // State to hold user information
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "",
    location: "",
    contactNumber: "",
    age: 0,
    gender: "",
  });

  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo>({
    name: "",
    location: "",
    contactNumber: "",
    specialization: "",
    hospitalname: "",
  });

  const navigate = useNavigate();

  const [doctorRegister, setDoctorRegister] = useState<boolean>(false);

  // Function to handle form submission
  const handleUserSignUp = () => {
    // Log user information to the console
    console.log("User Information:", userInfo);
  };


  const handleDoctorSignUp = () => {
    // Log user information to the console
    console.log("Doctor Information:", doctorInfo);
  };

  const handleSwitchUserType = () => {
    setDoctorRegister(!doctorRegister);
  };

  return (
    <div className="min-h-screen  flex justify-center items-center">
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
          <form>
            {/* Name Field */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 p-2 w-full border rounded-md"
                onChange={(e) =>
                  setDoctorInfo({ ...doctorInfo, name: e.target.value })
                }
              />
            </div>

            {/* Location Field */}
            <div className="mb-4">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-600"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            {/* Contact Number Field */}
            <div className="mb-4">
              <label
                htmlFor="contactNumber"
                className="block text-sm font-medium text-gray-600"
              >
                Contact Number
              </label>
              <input
                type="text"
                id="contactNumber"
                className="mt-1 p-2 w-full border rounded-md"
                onChange={(e) =>
                  setDoctorInfo({
                    ...doctorInfo,
                    contactNumber: e.target.value,
                  })
                }
              />
            </div>

            {/* Age Field */}
            <div className="mb-4">
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-600"
              >
                Hospital
              </label>
              <input
                type="text"
                id="hospitalName"
                className="mt-1 p-2 w-full border rounded-md"
                onChange={(e) =>
                  setDoctorInfo({ ...doctorInfo, hospitalname: e.target.value })
                }
              />
            </div>

            {/* Gender Field */}
            <div className="mb-4">
              <label
                htmlFor="Specialization"
                className="block text-sm font-medium text-gray-600"
              >
                Specialization
              </label>
              <select
                id="specialization"
                className="mt-1 p-2 w-full border rounded-md"
                onChange={(e) => {
                    console.log(e.target.value)
                    setDoctorInfo({
                        ...doctorInfo,
                        specialization: e.target.value,
                      })
                }
                  
                }
              >
                <option value="cardiology">Cardiology</option>
                <option value="dermatology">Dermatology</option>
                <option value="ent">ENT (Ear, Nose, and Throat)</option>
                <option value="orthopedics">Orthopedics</option>
                <option value="ophthalmology">Ophthalmology</option>
                <option value="gastroenterology">Gastroenterology</option>
                <option value="neurology">Neurology</option>
                <option value="pulmonology">Pulmonology</option>
                <option value="obgyn">Obstetrics and Gynecology</option>
                <option value="psychiatry">Psychiatry</option>
              </select>
            </div>

            {/* Sign Up Button */}
            <button
              type="button"
              className="bg-blue-500 text-white rounded-md hover:bg-blue-600 bg-primary mt-4 p-4 w-full text-custom-white"
              onClick={handleDoctorSignUp}
            >
              Sign Up Now
            </button>
            <p className="p-4 text-center mt-4">
              Already a user? &nbsp;
              <span
                className="text-custom-black cursor-pointer"
                onClick={() => {
                    navigate("/login")
                  console.log("nagivagte to login page");
                }}
              >
                Login here
              </span>
            </p>
          </form>
        </div>
      ) : (
        <div className=" mr-8 w-1/2 p-6 bg-white rounded-md shadow-md h-full">
          <h2 className="text-2xl font-semibold mb-4">Sign Up - User</h2>
          <form>
            {/* Name Field */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 p-2 w-full border rounded-md"
                onChange={(e) =>
                  setUserInfo({ ...userInfo, name: e.target.value })
                }
              />
            </div>

            {/* Location Field */}
            <div className="mb-4">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-600"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>

            {/* Contact Number Field */}
            <div className="mb-4">
              <label
                htmlFor="contactNumber"
                className="block text-sm font-medium text-gray-600"
              >
                Contact Number
              </label>
              <input
                type="text"
                id="contactNumber"
                className="mt-1 p-2 w-full border rounded-md"
                onChange={(e) =>
                  setUserInfo({ ...userInfo, contactNumber: e.target.value })
                }
              />
            </div>

            {/* Age Field */}
            <div className="mb-4">
              <label
                htmlFor="age"
                className="block text-sm font-medium text-gray-600"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                className="mt-1 p-2 w-full border rounded-md"
                onChange={(e) =>
                  setUserInfo({ ...userInfo, age: +e.target.value })
                }
              />
            </div>

            {/* Gender Field */}
            <div className="mb-4">
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-600"
              >
                Gender
              </label>
              <select
                id="gender"
                className="mt-1 p-2 w-full border rounded-md"
                onChange={(e) =>
                  setUserInfo({ ...userInfo, gender: e.target.value })
                }
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Sign Up Button */}
            <button
              type="button"
              className="bg-blue-500 text-white rounded-md hover:bg-blue-600 bg-primary mt-4 p-4 w-full text-custom-white"
              onClick={handleUserSignUp}
            >
              Sign Up Now
            </button>
            <p className="p-4 text-center mt-4">
              Already a user? &nbsp;
              <span
                className="text-custom-black cursor-pointer"
                onClick={() => {
                  console.log("nagivagte to login page");
                  navigate("/login")
                }}
              >
                Login here
              </span>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignUpForm;
