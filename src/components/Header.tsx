import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTokens } from "../features/auth/authSlice";

const NavBar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();


    const handleLogout = () => {
      console.log('Logout clicked');

      localStorage.clear();
      dispatch(
        setTokens({
          userInformation: {},
        })
      );
      navigate("/");
    };
    
  
  return (
    <nav className="bg-blue-500 p-4 flex w-full justify-between items-center border-b-2 border-custom-white">
      <div className="text-white text-xl font-semibold">HealthHub</div>

      <button
        className="bg-white text-blue-500 py-2 px-4 rounded-sm hover:bg-gray-100 bg-red"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>  )
}

export default NavBar