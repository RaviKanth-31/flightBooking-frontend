import "./flight.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";

const Flight = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useFetch(`https://flightbooking-backend.onrender.com/flights/find/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { date } = useContext(SearchContext);
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          {/* {open && (
            <div className="slider">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={data.photos[slideNumber]}
                  alt=""
                  className="sliderImg"
                />
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
            </div>
          )} */}
          <div className="hotelWrapper">
            <h1 className="hotelTitle">{data.name}</h1>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelTitle">{data.airline}</h1>
                <p className="hotelDesc">Seats Available: {data.available}</p>
              </div>
                <h2>
                  <b>₹{data.price}</b>
                </h2>
                <button className="bookNow" onClick={handleClick}>Reserve or Book Now!</button>
              </div>
            </div>
          </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} flightId={id}/>}
    </div>
  );
};

export default Flight;
