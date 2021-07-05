import axios from 'axios';
import { types } from './constants';

const seatsFetchedRequest = () => ({
    type: types.FETCH_SEATS_REQUEST,
});

const seatsFetchedSuccess = seats => ({
    type: types.FETCH_SEATS_SUCCESS,
    payload: seats
});

const seatsFetchedFail = error => ({
    type: types.FETCH_SEATS_FAIL,
    payload: error
});

export const fetchSeats = () => dispatch => {
    dispatch(seatsFetchedRequest());

    return axios.get('http://localhost:3004/seats')
        .then(res => res.data)
        .then(seats => {
            const seatsWithChosenProperty = seats.map(seat => ({ ...seat, chosen: false }))
            dispatch(seatsFetchedSuccess(seatsWithChosenProperty))
        })
        .catch(error => {
            dispatch(seatsFetchedFail(error))
        })
};

export const toggleChosenSeats = seatIds => ({
    type: types.TOGGLE_CHOSEN_SEATS,
    payload: seatIds
})

export const reserveSeats = seatIds => ({
    type: types.RESERVE_SEATS,
    payload: seatIds
})