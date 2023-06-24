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

  const { data, loading, error, reFetch } = useFetch(
    `/flights/search?arrivalCity=${arrival}&departureCity=${destination}`
  );


  data.map((item)=>{
    console.log(item.available);
  })
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
                  item.available && <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
  );
};

export default List;
