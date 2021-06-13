import React from 'react';
import { useLocation } from 'react-router-dom';

const ResultPage = () => {
    const location = useLocation();
    const chosenSeats = location.state.chosenSeats;

    const resultText = chosenSeats.map(seat => <li>rząd {seat.cords.x}, miejsce {seat.cords.y} ({seat.id})</li>);


    return (
        <div>
            <p>Twoja rezerwacja przebiegła pomyślnie!</p>
            <p>Wybrałeś miejsca:</p>
            <ul>
                {resultText}
            </ul>
            <p>Dziękujemy! W razie problemów prosimy o kontakt z działem administracji.</p>
        </div>
    );
}

export default ResultPage;