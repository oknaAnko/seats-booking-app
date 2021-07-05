import { types } from './constants';

const initialState = {
    isLoading: false,
    seats: [],
    error: null
};

export const seatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_SEATS_REQUEST:
            return { ...state, isLoading: true };
        case types.FETCH_SEATS_SUCCESS:
            return { ...state, isLoading: false, seats: action.payload };
        case types.FETCH_SEATS_FAIL:
            return { ...state, isLoading: false, error: action.payload };
        case types.TOGGLE_CHOSEN_SEATS:
            return {
                ...state,
                seats: state.seats.map(seat =>
                    action.payload.includes(seat.id)
                        ? { ...seat, chosen: !seat.chosen }
                        : seat
                )
            };
        case types.RESERVE_SEATS:
            return {
                ...state,
                seats: state.seats.map(seat =>
                    action.payload.includes(seat.id)
                        ? { ...seat, reserved: true }
                        : seat
                )
            }
        default:
            return state
    }
};