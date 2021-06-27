import React from 'react';
import { render, screen } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import { seatsReducer } from './app/reducers'
import * as actions from './app/actions'
import nock from 'nock/types';

window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener: function () { },
    removeListener: function () { }
  };
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('Fetch seats async actions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({ seats: {} })
  })

  it('dispatches FETCH_SEATS_SUCCESS action and returns seats on success', async () => {
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          seats: [
            {
              id: 's01',
              cords: {
                x: 0,
                y: 1,
              },
              reserved: false,
              chosen: false,
            }
          ],
        }
      })
    );

    nock('http://localhost:3004')
      .get('/seats')
      .reply(200, {
        seats: [
          {
            id: 's01',
            cords: {
              x: 0,
              y: 1,
            },
            reserved: false,
            chosen: false,
          }
        ],
      }
      )

    await store.dispatch(actions.fetchSeats())
    const dispatchedAtions = store.getActions()
    console.log(dispatchedAtions);

    expect(dispatchedAtions[0]).toEqual({ type: actions.FETCH_SEATS_REQUEST })
    expect(dispatchedAtions[1]).toEqual({ type: actions.FETCH_SEATS_SUCCESS })

  })

});


describe('Reducers and actions', () => {
  it('returns the initial state', () => {
    const initialState = seatsReducer(undefined, {});

    expect(initialState).toEqual({
      isLoading: false,
      seats: [],
      error: null
    });

  });


  it('should handle FETCH_SEATS_REQUEST', () => {
    const requestAction = {
      type: actions.FETCH_SEATS_REQUEST,
    }
    const initialState = { isLoading: false, seats: [], error: null }

    expect(seatsReducer(initialState, requestAction)).toEqual({
      isLoading: true,
      seats: [],
      error: null
    });

  });


  it('should handle FETCH_SEATS_FAIL', () => {
    const failAction = {
      type: actions.FETCH_SEATS_FAIL,
      payload: "error",
    }
    const initialState = { isLoading: false, seats: [], error: null }

    expect(seatsReducer(initialState, failAction)).toEqual({
      isLoading: false,
      seats: [],
      error: "error"
    })

  });


  it('should handle TOGGLE_CHOOSEN_SEATS', () => {
    const toggleChosenSeatsAction = {
      type: actions.TOGGLE_CHOOSEN_SEATS,
      payload: ['s01']
    }
    const state = {
      isLoading: false,
      seats: [
        {
          id: 's01',
          cords: {
            x: 0,
            y: 1,
          },
          reserved: false,
          chosen: false,
        }
      ],
      error: null
    }

    expect(seatsReducer(state, toggleChosenSeatsAction)).toEqual({
      isLoading: false,
      seats: [
        {
          id: 's01',
          cords: {
            x: 0,
            y: 1,
          },
          reserved: false,
          chosen: true,
        }
      ],
      error: null
    });

  });


  it('should handle RESERVE_SEATS', () => {
    const reserveSeatsAction = {
      type: actions.RESERVE_SEATS,
      payload: ['s01']
    }
    const state = {
      isLoading: false,
      seats: [
        {
          id: 's01',
          cords: {
            x: 0,
            y: 1,
          },
          reserved: false,
          chosen: false,
        }
      ],
      error: null
    }

    expect(seatsReducer(state, reserveSeatsAction)).toEqual({
      isLoading: false,
      seats: [
        {
          id: 's01',
          cords: {
            x: 0,
            y: 1,
          },
          reserved: true,
          chosen: false,
        }
      ],
      error: null
    });

  });

});