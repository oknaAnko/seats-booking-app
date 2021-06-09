const initialState = {
    isLoading: false,
    seats: [],
    error: null
};

export const seatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_SEATS_REQUEST':
            return { ...state, isLoading: true };
        case 'FETCH_SEATS_SUCCESS':
            return { ...state, isLoading: false, seats: action.payload };
        case 'FETCH_SEATS_FAIL':
            return { ...state, isLoading: false, error: action.payload };
        default:
            return state
    }
};