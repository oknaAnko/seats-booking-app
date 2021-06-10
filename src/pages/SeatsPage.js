import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchSeats } from '../app/actions';

import OneSeat from '../components/OneSeat';


const SeatsPage = () => {
    const allSeats = useSelector(state => state.seats.seats);
    const isLoading = useSelector(state => state.seats.isLoading);

    useEffect(() => {
        fetchSeats()
    }, []);

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