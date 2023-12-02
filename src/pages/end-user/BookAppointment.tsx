// Import necessary dependencies
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

// Define the interface for appointment information
interface AppointmentInfo {
  appointmentDate: string;
  appointmentTime: string;
  symptoms: string;

}

// Define the functional component for the appointment form
const AppointmentForm: React.FC = () => {
  // State to hold appointment information
  const [appointmentInfo, setAppointmentInfo] = useState<AppointmentInfo>({
    appointmentDate: '',
    appointmentTime: '',
    symptoms: '',
  });


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AppointmentInfo>()
  const onSubmit: SubmitHandler<AppointmentInfo> = (data) => console.log(data)


  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Appointment Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>


      <div className="mb-4">

            </div>



        {/* Appointment Date Field */}
        <div className="mb-4">
          <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-600">
            Appointment Date
          </label>
          <input
            type="date"
            id="appointmentDate"
            className="mt-1 p-2 w-full border rounded-md"
            {...register("appointmentDate")}
          />
        </div>

        {/* Appointment Time Field */}
        <div className="mb-4">
          <label htmlFor="appointmentTime" className="block text-sm font-medium text-gray-600">
            Appointment Time
          </label>
          <input
            type="time"
            id="appointmentTime"
            className="mt-1 p-2 w-full border rounded-md"
            {...register("appointmentTime")}
          />
        </div>

        {/* Symptoms Field */}
        <div className="mb-4">
          <label htmlFor="symptoms" className="block text-sm font-medium text-gray-600">
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
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
