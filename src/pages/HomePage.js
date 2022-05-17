import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { fetchSeats } from "../app/actions";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSeats());
  }, []);

  const [seatsNumber, setSeatsNumber] = useState("");
  const [closeSeats, setCloseSeats] = useState(false);

  const history = useHistory();

  const handleChangeSeatsNumber = (e) => setSeatsNumber(e.target.value);
  const handleChangeCloseSeats = (e) => setCloseSeats(e.target.checked);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (seatsNumber >= 5 && closeSeats) {
      alert(`Nie może być ${seatsNumber} miejsc obok siebie. Maksymalna liczba miejsc obok siebie wynosi 5.`);
      return;
    }

    if (Boolean(!seatsNumber)) {
      alert(`Proszę wybrać liczbę miejsc`);
      return;
    }

    const location = {
      pathname: "/miejsca",
      state: {
        seatsNumber,
        closeSeats,
      },
    };

    history.push(location);
  };

  return (
    <div className="background-image">
      <div className="wrapper">
        <form className="mx-auto" onSubmit={handleOnSubmit}>
          <div className="mb-3">
            <label htmlFor="inputNr" className="form-label">
              Liczba miejsc:
            </label>

            <input
              type="number"
              className="form-control"
              id="inputNr"
              value={seatsNumber}
              onChange={handleChangeSeatsNumber}
            />
          </div>
          <div className="mb-4 form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="gridCheck1"
              checked={closeSeats}
              onChange={handleChangeCloseSeats}
            />
            <label className="form-check-label" htmlFor="gridCheck1">
              Czy miejsca mają być obok siebie?
            </label>
          </div>
          <button type="submit" className="btn btn-primary">
            Rezerwuj
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
