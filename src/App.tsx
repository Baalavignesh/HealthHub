import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ErrorPage, Dashboard, Login } from "./pages";
import withAuth from "./HOC/withAuth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" Component={withAuth(Dashboard)} />
        <Route path="/error" Component={ErrorPage} />
        <Route path="/" Component={Login} />
      </Routes>
    </Router>
  );
}

export default App;
