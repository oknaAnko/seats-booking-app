import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


const HomePage = () => {
    const [seatsNumber, setSeatsNumber] = useState('');
    const [closeSeats, setCloseSeats] = useState(false)

    const history = useHistory();

    const handleChangeSeatsNumber = e => setSeatsNumber(e.target.value);
    const handleChangeCloseSeats = e => setCloseSeats(e.target.checked);

    const handleOnSubmit = e => {
        e.preventDefault();

        if (seatsNumber >= 5 && closeSeats) {
            alert(`Nie może być ${seatsNumber} miejsc obok siebie. Maksymalna liczba miejsc obok siebie wynosi 5.`);
            return;
        };

        if (Boolean(!seatsNumber)) {
            alert(`Proszę wybrać liczbę miejsc`);
            return;
        };

        const location = {
            pathname: '/miejsca',
            state: {
                seatsNumber,
                closeSeats
            }
        };

        history.push(location);
    }


    return (
        <div className="wrapper">
            <form onSubmit={handleOnSubmit} >

                <label>Liczba miejsc:
            <input type="number" value={seatsNumber} onChange={handleChangeSeatsNumber} />
                </label>

                <label> Czy miejsca mają być obok siebie?
            <input type="checkbox" checked={closeSeats} onChange={handleChangeCloseSeats} />
                </label>

                <button>Rezerwuj</button>

            </form>

        </div>
    );
}

export default HomePage;