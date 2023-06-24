import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, flightId }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { data, loading, error } = useFetch(`/flights/seats/${flightId}`);
  const { date } = useContext(SearchContext);


  const isAvailable = (seatNumber) => {
    const isFound = seatNumber.booked

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedSeats(
      checked
        ? [...selectedSeats, value]
        : selectedSeats.filter((item) => item !== value)
    );
  };
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedSeats.map((seatId) => {
          const res = axios.put(`/seats/availability/${seatId}`);
          axios.put(`/flights/reduce/${flightId}`)
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };
  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your seat:</span>
        {data.map((item) => (
          item &&
          (<div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.name}</div>
              <div className="rDesc">{item.airline}</div>
            </div>
            <div className="rSelectRooms">
              <div className="rTitle">{item.name}</div>
              {item.seatNumbers.map((seatNumber) => (
                <div className="room">
                  <label>{seatNumber.number}</label>
                  <input
                    type="checkbox"
                    value={seatNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(seatNumber)}
                  />
                </div>
              ))}
            </div>
          </div>)
        ))}
        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;
