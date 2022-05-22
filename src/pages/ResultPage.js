import React from "react";
import { useLocation } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();
  const chosenSeats = location.state.chosenSeats;

  const resultText = chosenSeats.map((seat) => (
    <li className="list-group-item">
      rząd {seat.cords.x}, miejsce {seat.cords.y}
    </li>
  ));

  return (
    <div className="background-image">
      <div className="background-gradient">
        <div className="wrapper">
          <p className="success-text">Twoja rezerwacja przebiegła pomyślnie!</p>
          <p className="card-text">Wybrałeś miejsca:</p>
          <ul className="list-group list-group-flush">{resultText}</ul>

          <p className="final-text">Dziękujemy! W razie problemów prosimy o kontakt z działem administracji.</p>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
