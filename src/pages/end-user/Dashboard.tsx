import { useEffect } from "react";
import { setTokens } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/Header";
import SearchIcon from "@mui/icons-material/Search";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  useEffect(() => {
    console.log("dashboard screen");
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <NavBar />
      <div className="container">
        <h1 className="mt-8">Dashboard Screen</h1>

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
          <p>|or|</p>
          <button className="w-fit ml-4 bg-primary h-fit p-4 rounded-md text-custom-white" onClick={() => navigate("/bookappointment")}>
            Book Appointment
          </button>
        </div>

        <hr className="border-custom-white mt-4 mb-4" />

        {/* bottom half */}
        <div className="">
          <div className="border-2 border-custom-white p-4 rounded-md mb-4">
            <h1>Updates</h1>
    <h2 className="pt-4">Everything seems fine in your area. </h2>
          </div>

          <div className="border-2 border-custom-white p-4 rounded-md mt-4">
            <h2>Your Appointments</h2>

            <div className="relative overflow-x-auto border-2 rounded-md border-custom-white mt-4">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b p-10">
                  <tr>
                    <th scope="col" className="px-6 py-6">
                      Product name
                    </th>
                    <th scope="col" className="px-6 py-6">
                      Color
                    </th>
                    <th scope="col" className="px-6 py-6">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-6">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b border-b-custom-white dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      Apple MacBook Pro 17"
                    </th>
                    <td className="px-6 py-4">Silver</td>
                    <td className="px-6 py-4">Laptop</td>
                    <td className="px-6 py-4">$2999</td>
                  </tr>
                </tbody>
              </table>
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
