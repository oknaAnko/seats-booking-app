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

  const date = new Date().toLocaleDateString("pl", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      <div className="background-image">
        <div className="background-gradient">
          <div className="background-circle"></div>
          <div className="seats-page-wrapper">
            <section className="info-container container-sm">
              <div className="row">
                <div className="col-sm-4">
                  <div className="card">
                    <div className="card-body">
                      <p className="card-title">Tytuł</p>
                      <p className="card-text fw-bold">Interstellar</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="card">
                    <div className="card-body">
                      <p className="card-title">Dzień</p>
                      <p className="card-text">{date}</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="card">
                    <div className="card-body">
                      <p className="card-title">Godzina</p>
                      <p className="card-text">16:30</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
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
    </div>
  );
};

SeatsPage.defaultProps = {
  seatsNumber: 0,
  closeSeats: false,
};

export default SeatsPage;
