// Import necessary dependencies
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ScheduleAppointment } from "../../services/Appointment";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

// Define the interface for appointment information
interface AppointmentInfo {
  user_id: number;
  appointment_date: Date;
  appointment_time: EpochTimeStamp;
  location:string;
  symptoms: string;
}

// Define the functional component for the appointment form
const AppointmentForm: React.FC = () => {
  const { userInformation, userType } = useSelector(
    (state: RootState) => state.authStore
  );

  const [userId, setUserId] = useState<number>();

  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
  } = useForm<AppointmentInfo>();

  
  const onSubmit: SubmitHandler<AppointmentInfo> = async (data) => {
    console.log(data);
    let response = await ScheduleAppointment(data);
    console.log(response);

    navigate("/");
  };

  let setUser = (val: any) => {
    setUserId(val.user_id);
    setValue("user_id", val.user_id);
    setValue("location", val.location);
    console.log(val.location);
  };


  

  useEffect(() => {
    setUser(userInformation);

  }, []);

  return (
    <div className="gradiant-background h-screen flex items-center">
      <div className="mx-auto pt-8 p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl font-semibold mb-4">Appointment Form</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 hidden">
            <label
              htmlFor="user_id"
              className="block text-sm font-medium text-gray-600"
            >
              User ID
            </label>
            <input
              type="number"
              id="user_id"
              className="mt-1 p-2 w-full border rounded-md"
              defaultValue={userId}
              {...register("user_id")}
            />
          </div>

          {/* Appointment Date Field */}
          <div className="mb-4">
            <label
              htmlFor="appointmentDate"
              className="block text-sm font-medium text-gray-600"
            >
              Appointment Date
            </label>
            <input
              type="date"
              id="appointmentDate"
              className="mt-1 p-2 w-full border rounded-md"
              {...register("appointment_date")}
            />
          </div>

          {/* Appointment Time Field */}
          <div className="mb-4">
            <label
              htmlFor="appointmentTime"
              className="block text-sm font-medium text-gray-600"
            >
              Appointment Time
            </label>
            <input
              type="time"
              id="appointmentTime"
              className="mt-1 p-2 w-full border rounded-md"
              {...register("appointment_time")}
            />
          </div>

          {/* Symptoms Field */}
          <div className="mb-4">
            <label
              htmlFor="symptoms"
              className="block text-sm font-medium text-gray-600"
            >
              Symptoms
            </label>
            <textarea
              id="symptoms"
              className="mt-1 p-2 w-full border rounded-md"
              {...register("symptoms")}
              rows={4}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md hover:bg-blue-600 bg-primary mt-4 p-4 w-full text-custom-white"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
