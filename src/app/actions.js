import axios from 'axios';
import { store } from './store';

export const FETCH_SEATS_REQUEST = "FETCH_SEATS_REQUEST";
export const FETCH_SEATS_SUCCESS = "FETCH_SEATS_SUCCESS";
export const FETCH_SEATS_FAIL = "FETCH_SEATS_FAIL";
export const TOGGLE_CHOOSEN_SEATS = "TOGGLE_CHOOSEN_SEATS";
export const RESERVE_SEATS = "RESERVE_SEATS";


const seatsFetchedRequest = () => ({
    type: 'FETCH_SEATS_REQUEST',
});

const seatsFetchedSuccess = seats => ({
    type: 'FETCH_SEATS_SUCCESS',
    payload: seats
});

const seatsFetchedFail = error => ({
    type: 'FETCH_SEATS_FAIL',
    payload: error
});

export const fetchSeats = () => dispatch => {
    dispatch(seatsFetchedRequest());

    axios.get('http://localhost:3004/seats')
        .then(res => res.data)
        .then(seats => {
            const seatsWithChosenProperty = seats.map(seat => ({ ...seat, chosen: false }))
            dispatch(seatsFetchedSuccess(seatsWithChosenProperty))
        })
        .catch(error => {
            dispatch(seatsFetchedFail(error))
        })
};

store.dispatch(fetchSeats());

export const toggleChosenSeats = seatIds => ({
    type: 'TOGGLE_CHOOSEN_SEATS',
    payload: seatIds
})

export const reserveSeats = seatIds => ({
    type: 'RESERVE_SEATS',
    payload: seatIds
})