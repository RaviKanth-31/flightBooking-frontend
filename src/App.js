import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Flight from "./pages/flight/Flight";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register/register";
import Admin from "./pages/admin/Admin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/flights" element={<List/>}/>
        <Route path="/flight/:id" element={<Flight/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/admindashboard" element={<Admin/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
