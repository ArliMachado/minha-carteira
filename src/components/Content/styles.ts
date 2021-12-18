import styled from 'styled-components';

export const Wrapper = styled.div`
  grid-area: CT;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.primary};

  padding: 25px;

  height: calc(100vh - 70px); // Altura da tela menos tamanho do cabeçalho
  overflow-y: scroll; // define o scrool em todo conteudo q passar do footer

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.colors.tertiary};
  }
`;
