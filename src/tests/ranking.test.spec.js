import React from "react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Ranking from '../pages/Ranking';
import App from '../App';

describe('Testa a página de ranking', () => {
    beforeEach(() => {
      localStorage.setItem('ranking', JSON.stringify([{ name: "Usuário", score: 100, picture: "https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e"}]));
    })

    it('Testa se os componentes são renderizados na tela', async () => {
        renderWithRouterAndRedux(<Ranking />);

        const title = screen.getByTestId('ranking-title');
        const image = screen.getByAltText('imagem usuario');
        const name = screen.getByRole('heading', { name: /usuário/i, level: 3 })
        const score = screen.getByRole('heading', { name: '100', level: 3 });
        const button = screen.getByRole('button', { name: /voltar/i });

        expect(title).toBeInTheDocument();
        expect(image).toHaveProperty('src', 'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e');
        expect(name).toBeInTheDocument();
        expect(score).toBeInTheDocument();
        expect(button).toBeInTheDocument();

    })

    it('Testa a rota do botão que volta para o início da aplicação', () => {
        const { history } = renderWithRouterAndRedux(<App />)

        history.push('/ranking');

        const button = screen.getByRole('button', { name: /voltar/i });
       
        userEvent.click(button);
        
        const { pathname } = history.location;
        expect(pathname).toBe('/');
    });
})