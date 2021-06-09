import React, { useEffect } from 'react';
import { fetchSeats } from '../app/actions';


const SeatsPage = () => {

    useEffect(() => {
        fetchSeats()
        console.log('ok');
    }, [])

    return (
        <div>Seatspage</div>
    );
}

export default SeatsPage;