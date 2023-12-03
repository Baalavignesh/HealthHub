import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ErrorPage, Dashboard, Login } from "./pages";
import withAuth from "./HOC/withAuth";
import SignUpForm from "./pages/authentication/RegisterPage";
import AppointmentForm from "./pages/end-user/BookAppointment";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" Component={withAuth(Dashboard)} />
        <Route path="/" Component={withAuth(Dashboard)} />
        <Route path="/error" Component={ErrorPage} />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={SignUpForm} />
        <Route path="/bookappointment" Component={AppointmentForm} /> 
      </Routes>
    </Router>
  );
}

export default App;
