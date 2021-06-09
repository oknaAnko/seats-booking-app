import { configureStore } from '@reduxjs/toolkit';
import { seatsReducer } from './reducers';

export const store = configureStore({
  reducer: {
    seats: seatsReducer,
  },
});
