import {
  faBed,
  faCalendarDays,
  faCar,
  faPerson,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import DatePicker from 'react-datepicker';
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import 'react-datepicker/dist/react-datepicker.css';


const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [arrival, setArrival] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);


  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const { dispatch } = useContext(SearchContext);
  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, arrival, selectedDate } });
    console.log(selectedDate);
    navigate("/flights", { state: { destination, arrival, selectedDate} });
  };
  const handleDateChange = (date) => {
      setSelectedDate(date);
  };
  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flights</span>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
              Fly with ease.
            </h1>
            <p className="headerDesc">
            Book. Fly. Explore.
            </p>
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPlane} className="headerIcon" />
                <input
                  type="text"
                  placeholder="From"
                  className="headerSearchInput"
                  onChange={(e) => setArrival(capitalizeFirstLetter(e.target.value))}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                  <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  minDate={new Date()}
                  maxDate={new Date(2023, 6, 15)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faPlane} className="headerIcon" />
                <input
                  type="text"
                  placeholder="To"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(capitalizeFirstLetter(e.target.value))}
                />
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
