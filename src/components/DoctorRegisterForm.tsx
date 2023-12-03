import { useForm, SubmitHandler } from "react-hook-form";
import { RegisterDoctor } from "../services/Register";
import { useNavigate } from "react-router-dom";

interface DoctorInfo {
    name: string;
    email: string;
    password: string;
    location: string;
    contactNumber: string;
    specialization: string;
    hospitalName: string;
  }
  

const DoctorRegisterForm = () => {


  let navigate = useNavigate();
      // Doctor Form Registration
  const {
    register:registerDoctor,
    handleSubmit:handleSubmitDoctor,
    watch:watchDoctor,
    formState: { errors:errorDoctor },
  } = useForm<DoctorInfo>();

  const onDoctorSubmit: SubmitHandler<DoctorInfo> =  async (data) => {
    console.log(data);
     let response = await RegisterDoctor(data);
     console.log(response);
     navigate("/login")
  };
    return (
        <form onSubmit={handleSubmitDoctor(onDoctorSubmit)}>
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
            {...registerDoctor("name")}
          />
        </div>
        {/* Email Input */}
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
            {...registerDoctor("email")}
          />
        </div>
        {/* Password Input */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="text"
            id="password"
            className="mt-1 p-2 w-full border rounded-md"
            {...registerDoctor("password")}
          />
        </div>

        {/* Location Input */}
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
            {...registerDoctor("location")}
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
            {...registerDoctor("contactNumber")}
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
            {...registerDoctor("hospitalName")}
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
            {...registerDoctor("specialization")}
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
          type="submit"
          className="bg-blue-500 text-white rounded-md hover:bg-blue-600 bg-primary mt-4 p-4 w-full text-custom-white"
        >
          Sign Up Now
        </button>
      </form>
    )
}

export default DoctorRegisterForm;