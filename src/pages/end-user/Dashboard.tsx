import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTokens } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {}, []);

  const handleLogout = () => {
    dispatch(
      setTokens({
        accessToken: "",
        refreshToken: "",
        idToken: "",
      })
    );
    navigate("/");
  };

  useEffect(() => {
    console.log('dashboard screen');
  }, [])

  return (
    <div>
      <h1>Dashboard Screen</h1>
      <button className="p-4 rounded-sm bg-primary" onClick={handleLogout}>
        Remove Access Token
      </button>
    </div>
  );
};

export default Dashboard;
