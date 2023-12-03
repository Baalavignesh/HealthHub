import { useForm, SubmitHandler } from "react-hook-form";
import { RegisterUser } from "../services/Register";
import { useNavigate } from "react-router-dom";

interface UserInfo {
    name: string;
    email: string;
    password: string;
    location: string;
    contact_number: string;
    age: number;
    gender: string;
  }
  

const UserRegisterForm = () => {

let navigate = useNavigate();
      // User Form Registration
  const {
    register: registerUser,
    handleSubmit: handleSubmitUser,
    watch: watchUser,
    formState: { errors: errorUser },
  } = useForm<UserInfo>();

  const onUserSubmit: SubmitHandler<UserInfo> = async (data) => {
    console.log(data);
    let response = await RegisterUser(data);

    if(response) {
      navigate("/login")
    }
  };


    return (
        <form onSubmit={handleSubmitUser(onUserSubmit)}>
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
            {...registerUser("name")}
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            className="mt-1 p-2 w-full border rounded-md"
            {...registerUser("email")}
          />
        </div>

        {/* Passoword Field */}
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
            {...registerUser("password")}
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
            {...registerUser("location")}
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
            {...registerUser("contact_number")}
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
            {...registerUser("age")}
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
            {...registerUser("gender")}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-md hover:bg-blue-600 bg-primary mt-4 p-4 w-full text-custom-white"
        >
          Sign Up Now
        </button>
      </form>
    )
}

export default UserRegisterForm;