import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { fetchSeats } from "../app/actions";
import { useDispatch } from "react-redux";

const HomePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSeats());
  }, [dispatch]);

  const [seatsNumber, setSeatsNumber] = useState("");

  const history = useHistory();

  const handleChangeSeatsNumber = (e) => setSeatsNumber(e.target.value);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (Boolean(!seatsNumber)) {
      alert(`Proszę wybrać liczbę miejsc`);
      return;
    }

    const location = {
      pathname: "/miejsca",
      state: {
        seatsNumber,
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
          <button type="submit" className="btn btn-primary">
            Rezerwuj
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;
