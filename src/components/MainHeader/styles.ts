import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    grid-area: MH;
    background-color: ${theme.colors.secondary};

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;

    border-bottom: 1px solid ${theme.colors.gray};
  `}
`;

export const Profile = styled.div`
  ${({ theme }) => css`
    color: ${theme.colors.white};
  `};
`;
export const Welcome = styled.h3``;
export const UserName = styled.span``;
