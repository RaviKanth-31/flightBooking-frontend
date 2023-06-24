import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [arrival, setArrival] = useState(location.state.arrival);
  const [selectedDate, setSelectedDate] = useState(location.state.selectedDate);
  const path = location.pathname.split("/");
  const id = path[path.length-1];
    console.log(path, id);
  const { data, loading, error, reFetch } = useFetch(
    `https://flightbooking-backend.onrender.com/flights/search?arrivalCity=${arrival}&departureCity=${destination}`
  );



// Sort the flights array based on availability in ascending order
data.sort((a, b) => a.availabile - b.availabile);

console.log(data);
  
  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
          <div className="listResult">
            {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
  );
};

export default List;
