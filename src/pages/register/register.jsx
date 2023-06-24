import "../login/login.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [credentials, setCredentials] = useState({
      username: undefined,
      email: undefined,
      password: undefined,
    });
  
  
    const navigate = useNavigate()
  
    const handleChange = (e) => {
      setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };
  
    const handleClick = async (e) => {
      e.preventDefault();
      try {
        await axios.post("https://flightbooking-backend.onrender.com/auth/register", credentials);
        navigate("/login")
      } catch (err) {
        console.log(err)
      }
    };
  
  
    return (
      <div className="login">
        <div className="lContainer">
        <input
            type="email"
            placeholder="email"
            id="email"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="text"
            placeholder="username"
            id="username"
            onChange={handleChange}
            className="lInput"
          />
          <input
            type="password"
            placeholder="password"
            id="password"
            onChange={handleChange}
            className="lInput"
          />
          <button onClick={handleClick} className="lButton">
            Register
          </button>
        </div>
      </div>
  
      );
  };
  
  export default Register;
