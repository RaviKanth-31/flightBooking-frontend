import { Link } from "react-router-dom";
import "./searchItem.css";
import {
  faPlane
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance"><b>{item.arrivalCity} - {item.departureCity}</b></span>
        {/* <span className="siDistance">{item.distance}m from center</span> */}
        {/* <span className="siTaxiOp">Free airport taxi</span> */}
        {/* <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span> */}
        <span className="siFeatures">Seats Available: {item.available}</span>
        {/* <span className="siCancelOp">Free cancellation </span> */}
        {/* <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span> */}
      </div>
      <div className="siDetails">
        
        <div className="siDetailTexts">
          
          <span className="siPrice">₹{item.price}</span>
          <Link to={`https://flightbooking-backend.onrender.com/flights/find/${item._id}`}>
           <button className="siCheckButton"
           disabled={!item.available}
           >See availability</button>
          </Link>
          
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
