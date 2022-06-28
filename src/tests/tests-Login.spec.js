import React from "react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import fetchMock from 'fetch-mock-jest';
import Login from "../pages/Login";
import App from '../App';

describe('Testa a página de Login', () => {
    it('Testa se os inputs são renderizados na tela', () => {
        renderWithRouterAndRedux(<Login />);

        const name = screen.getByTestId('input-player-name');
        const email = screen.getByTestId('input-gravatar-email');

        expect(name).toBeInTheDocument();
        expect(email).toBeInTheDocument();

        expect(name).toHaveValue('');
        expect(email).toHaveValue('');
    })

    it('Testa se o botão é habilitado após preencher os inputs', () => {
        renderWithRouterAndRedux(<Login />);

        const button = screen.getByTestId('btn-play');

        expect(button).toBeDisabled();

        const name = screen.getByTestId('input-player-name');
        const email = screen.getByTestId('input-gravatar-email');

        userEvent.type(name, 'meunome');
        userEvent.type(email, 'meuemail');

        expect(button).toBeEnabled();
    })

   it('Testa se é feita uma requisição à API para obter o token', async () => {
        renderWithRouterAndRedux(<App />);

        const button = screen.getByTestId('btn-play')
        const name = screen.getByTestId('input-player-name');
        const email = screen.getByTestId('input-gravatar-email');

        userEvent.type(name, 'meunome');
        userEvent.type(email, 'meuemail');

        fetchMock.getOnce('https://opentdb.com/api_token.php?command=request', {
        body: { token: 'token' },
        }); 

        userEvent.click(button);
        
        await waitFor(() => expect(fetchMock.called()).toBeTruthy());
    })
})