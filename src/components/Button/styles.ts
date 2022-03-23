import styled, { css } from 'styled-components';

export const Wrapper = styled.button`
  ${({ theme }) => css`
    width: 100%;

    margin: 7px 0;
    padding: 10px;

    border-radius: 5px;

    font-weight: bold;
    color: ${theme.colors.white};
    background-color: ${theme.colors.warning};

    transition: opacity 0.3s;

    &:hover {
      opacity: 0.7;
    }
  `}
`;
