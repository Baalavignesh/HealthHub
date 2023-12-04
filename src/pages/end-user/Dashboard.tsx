import { useEffect, useState } from "react";
import { setTokens } from "../../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/Header";
import SearchIcon from "@mui/icons-material/Search";
import { RootState } from "../../store/store";
import { GetAppointments } from "../../services/Appointment";

interface AppointmentResponse {
  appointment_id: number;
  user_id: number;
  doctor_id: number;
  appointment_date: string;
  appointment_time: string;
  location: string;
  symptoms: string;
  result: string;
}

const Dashboard = () => {
  const navigate = useNavigate();

  let [isLoaded, setIsLoaded] = useState<boolean>(true);
  let [appointmentDetails, setAppointmentDetails] = useState<
    AppointmentResponse[]
  >([]);

  const { userInformation, userType } = useSelector(
    (state: RootState) => state.authStore
  );

  useEffect(() => {}, []);

  let GetUserAppointment = async () => {
    let response = await GetAppointments(userInformation, userType);

    console.log(response.data);

    if (response.data) {
      setIsLoaded(false);
      setAppointmentDetails(response.data);
    }
  };

  useEffect(() => {
    console.log("dashboard screen");
    console.log(userInformation, userType);

    GetUserAppointment();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <NavBar />
      <div className="container">
        <h1 className="mt-8">Dashboard</h1>

        <div className="w-full flex justify-between items-center mt-4">
          <div className="flex w-2/3 justify-center items-center">
            <input
              className="border-2 border-custom-black p-3 rounded-md w-full m-4 ml-0"
              placeholder="Enter your symptomps to search for cause"
            ></input>
            <SearchIcon
              className="border-2 rounded-full border-b-custom-black"
              fontSize="large"
            />
          </div>
          {userType == "User" && (
            <div className="flex justify-center items-center">
              <p>|or|</p>

              <button
                className="w-fit ml-4 bg-primary h-fit p-4 rounded-md text-custom-white"
                onClick={() => navigate("/bookappointment")}
              >
                Book Appointment
              </button>
            </div>
          )}
        </div>

        <hr className="border-custom-white mt-4 mb-4" />

        {/* bottom half */}
        <div className="">
          <div className="border-2 border-custom-white p-4 rounded-md mb-4">
            <h1>Updates</h1>
            <h2 className="pt-4">Everything seems fine in your area. </h2>
          </div>

          <div className="border-2 border-custom-white p-4 rounded-md mt-4">
            {/* <h2>{appointmentDetails?.length > 0 ? "Your Appointments": "No Appointments"}</h2> */}
            <h2>Your Appointments</h2>

            <div className="relative overflow-x-auto border-2 rounded-md border-custom-white mt-4">
              {!isLoaded ? (
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b p-10">
                    <tr>
                      <th scope="col" className="px-6 py-6">
                        Doctor Name
                      </th>
                      <th scope="col" className="px-6 py-6">
                        Appointment Date
                      </th>

                      <th scope="col" className="px-6 py-6">
                        Appointment Time
                      </th>
                      <th scope="col" className="px-6 py-6">
                        Location
                      </th>
                      <th scope="col" className="px-6 py-6">
                        Symptomps
                      </th>
                      <th scope="col" className="px-6 py-6">
                        Result
                      </th>
                    </tr>
                  </thead>

                  {appointmentDetails?.length > 0 ? (
                    <tbody>
                      {appointmentDetails.map((appointment, index) => {
                        return (
                          <tr className="bg-white border-b border-b-custom-white dark:bg-gray-800 dark:border-gray-700" key={index}>
                            <th
                              scope="row"
                              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              {(appointment.doctor_id) ? appointment.doctor_id : "pending"}
                            </th>
                            <td className="px-6 py-4">{appointment.appointment_date}</td>
                            <td className="px-6 py-4">{appointment.appointment_time}</td>
                            <td className="px-6 py-4">{appointment.location}</td>
                            <td className="px-6 py-4">{appointment.symptoms}</td>
                            <td className="px-6 py-4">{(appointment.result?.length > 0) ? appointment.result : "pending"}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  ) : (
                    <tbody>
                      <tr className="bg-white border-b border-b-custom-white dark:bg-gray-800 dark:border-gray-700">
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          ---
                        </th>
                        <td className="px-6 py-4">---</td>
                        <td className="px-6 py-4">---</td>
                        <td className="px-6 py-4">---</td>
                        <td className="px-6 py-4">---</td>
                        <td className="px-6 py-4">---</td>
                      </tr>
                    </tbody>
                  )}
                </table>
              ) : (
                <p>Loading...Please Wait</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div></div>

      <div></div>
    </div>
  );
};

export default Dashboard;
