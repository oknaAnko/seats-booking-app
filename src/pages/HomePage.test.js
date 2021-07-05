import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-MemoryRouter';
import { createMemoryHistory } from 'history';

import HomePage from './HomePage';
import SeatsPage from './SeatsPage';

afterEach(cleanup);

window.matchMedia = window.matchMedia || function () {
    return {
        matches: false,
        addListener: function () { },
        removeListener: function () { }
    };
};


describe('HomePage', () => {
    it('renders input to fill in the number of seats', () => {
        render(<HomePage />);

        const input = screen.getByLabelText('Liczba miejsc');

        expect(input).toBeInTheDocument();
    });


    it('renders checkbox', () => {
        render(<HomePage />);

        const checkbox = screen.getByText('Czy miejsca mają być obok siebie?');

        expect(checkbox).toBeInTheDocument();

    });


    it('changes number seats state', () => {
        render(<HomePage />);

        const currentState = screen.getByText('');

        expect(currentState.textContent).toBe("");

        const input = screen.getByLabelText('Liczba miejsc');
        const btn = screen.getByText('Wybierz miejsca');
        userEvent.type(input, '3');
        userEvent.click(btn);
        const newState = screen.getByText('3');

        expect(newState.textContent).toBe("3");
    })


    it('routes to seats page', () => {
        const history = createMemoryHistory();
        history.push = jest.fn();

        render(<MemoryRouter history={history}> <HomePage /></MemoryRouter>);

        const input = screen.getByLabelText('Liczba miejsc');
        const btn = screen.getByText('Wybierz miejsca');
        userEvent.type(input, '3');
        userEvent.click(btn);

        expect(history.push).toHaveBeenCalledWith('/miejsca')

    });


    it('routes to result page', () => {
        const history = createMemoryHistory();
        history.push = jest.fn();

        render(<MemoryRouter history={history}><SeatsPage /></MemoryRouter>);

        const btn = screen.getByText('Rezerwuj');
        userEvent.click(btn);

        expect(history.push).toHaveBeenCalledWith('/podsumowanie');

    })

    it('redirects to home page', () => {
        const history = createMemoryHistory();

        render(<MemoryRouter history={history}><SeatsPage allSeats={null} /></MemoryRouter>);

        expect(history.location.pathname).toBe('/');

    })
})