import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Feedback from '../pages/Feedback';

describe('Teste a página de Feedback', () => {
  it('01 - Renderiza a página de Feedback', () => {
    renderWithRouterAndRedux(<Feedback />);
    // const feedbackPage = screen.getByRole('heading', { level: 1 });
    const feedbackPage = screen.getByText(/feedback page/i);
    expect(feedbackPage).toHaveTextContent('Feedback Page');
  });

  it('02 - Renderiza na tela nome, gravatar e score do jogador', () => {
    renderWithRouterAndRedux(<Feedback />);
    expect(screen.getByTestId("header-profile-picture")).toBeInTheDocument();
    expect(screen.getByTestId("header-player-name")).toBeInTheDocument();
    expect(screen.getByTestId("header-score")).toBeInTheDocument();
  });

  it('03 - Renderiza na tela mensagem de feedback para jogador', () => {
    renderWithRouterAndRedux(<Feedback />);
    expect(screen.getByTestId("feedback-text")).toBeInTheDocument();
  });

  it('04 - Renderiza na tela o número de acertos e pontuação do jogador', () => {
    renderWithRouterAndRedux(<Feedback />);
    expect(screen.getByTestId("feedback-total-score")).toBeInTheDocument();
    expect(screen.getByTestId("feedback-total-question")).toBeInTheDocument();
  });

  it('05 - Renderiza na tela os botões de \'Ranking\' e \'Jogar Novamente\'', () => {
    renderWithRouterAndRedux(<Feedback />);
    expect(screen.getByTestId("btn-ranking")).toBeInTheDocument();
    expect(screen.getByTestId("btn-play-again")).toBeInTheDocument();
  });

  it('06 - Testa se ao clicar no botão \'Ranking\' a navegação acontece normalmente', async () => {
    renderWithRouterAndRedux(<Feedback />);
    const rankingPage = screen.getByTestId("btn-ranking");
    userEvent.click(rankingPage);
    await waitFor(
      () => expect(screen.queryAllByText(/Ranking/i)).toBeInTheDocument(),
      {timeout: 3000}
    );
    expect(window.location.pathname).toBe('/ranking');
  });

  it('07 - Testa se ao clicar no botão \'Jogar Novamente\' a navegação acontece normalmente', async () => {
    renderWithRouterAndRedux(<Feedback />);
    const rankingPage = screen.getByTestId("btn-play-again");
    userEvent.click(rankingPage);
    await waitFor(
      () => expect(screen.queryAllByText(/Play/i)).toBeInTheDocument(),
      {timeout: 3000}
    );
    expect(window.location.pathname).toBe('/');
  });
});