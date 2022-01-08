import styled, { css } from 'styled-components';

export const Header = styled.header`
  > p {
    font-size: 18px;
  }
`;

export const HeaderTitle = styled.h1`
  display: flex;
`;

export const ImageWrapper = styled.div`
  margin-left: 7px;
`;

export const Wrapper = styled.div`
  ${({ theme }) => css`
    width: 48%;
    height: 260px;

    background-color: ${theme.colors.tertiary};
    color: ${theme.colors.white};

    border-radius: 7px;

    margin: 10px 0;
    padding: 30px 20px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `}

  @media(max-width: 770px) {
    width: 100%;
    ${HeaderTitle} {
      font-size: 24px;
    }

    ${Header} {
      > p {
        font-size: 14px;
      }
    }

    > footer span {
      font-size: 14px;
    }
  }

  @media (max-width: 420px) {
    width: 100%;
    height: auto;

    ${Header} {
      > p {
        margin-bottom: 15px;
      }
    }
  }
`;
