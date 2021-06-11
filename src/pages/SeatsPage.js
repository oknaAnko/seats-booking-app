import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchSeats } from '../app/actions';

import OneSeat from '../components/OneSeat';


const SeatsPage = () => {
    const allSeats = useSelector(state => state.seats.seats);
    const isLoading = useSelector(state => state.seats.isLoading);

    useEffect(() => {
        fetchSeats()
    }, []);

    const location = useLocation();
    const seatsNumber = location.state.seatsNumber
    const closeSeats = location.state.closeSeats

    const seatsMatrix = allSeats.map(seat => <OneSeat key={seat.id} {...seat} />);

    return (
        <div>SeatsPage
            {isLoading
                ? <p>Ładuję</p>
                :
                <div className="seats-container">
                    {seatsMatrix}
                </div>
            }
            <button type="submit">Rezerwuj</button>
        </div>
    );
}

export default SeatsPage;