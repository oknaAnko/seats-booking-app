import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { toggleChosenSeats, reserveSeats } from "../app/actions";

import OneSeat from "../components/OneSeat";

const SeatsPage = () => {
  const allSeats = useSelector((state) => state.seats.seats);
  const isLoading = useSelector((state) => state.seats.isLoading);

  const location = useLocation();
  const seatsNumber = location.state.seatsNumber;
  const closeSeats = location.state.closeSeats;

  const dispatch = useDispatch();

  const history = useHistory();

  const notReservedSeats = allSeats.filter((seat) => !seat.reserved);

  useEffect(() => {
    if (!allSeats.length) {
      return history.push("/");
    }

    const idsTable = [];

    if (!closeSeats) {
      for (let i = 0; i < seatsNumber; i++) {
        const index = Math.floor(Math.random() * notReservedSeats.length);
        idsTable.push(notReservedSeats[index].id);
      }
    }
    dispatch(toggleChosenSeats(idsTable));
  }, []);

  const seatsMatrix = allSeats.map((seat) => <OneSeat key={seat.id} id={seat.id} />);

  const chosenSeats = allSeats.filter((seat) => seat.chosen);
  const chosenSeatsIds = chosenSeats.map((seat) => seat.id);

  const handleSeatsSubmit = (e) => {
    e.preventDefault();
    dispatch(reserveSeats(chosenSeatsIds));

    const location = {
      pathname: "/podsumowanie",
      state: {
        chosenSeats,
      },
    };

    history.push(location);
  };

  return (
    <div>
      <div className="background-image">
        <div className="seats-page-wrapper">
          <div className="info-container">
            <h1>Interstellar</h1>
            <p>Wotek</p>
            <p>godzina 16:30</p>
          </div>
          {isLoading ? <p>Trwa ładowanie sali</p> : <div className="seats-container">{seatsMatrix}</div>}
          <ul className="legend-container">
            <li>
              <span className="legend"></span>Miejsca dostępne
            </li>
            <li>
              <span className="legend"></span>Miejsca zarezerwowane
            </li>
            <li>
              <span className="legend"></span>Twój wybór
            </li>
          </ul>
          <button className="btn btn-primary btn-legend" type="submit" onClick={handleSeatsSubmit}>
            Rezerwuj
          </button>
        </div>
      </div>
    </div>
  );
};

SeatsPage.defaultProps = {
  seatsNumber: 0,
  closeSeats: false,
};

export default SeatsPage;
