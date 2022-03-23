import styled, { css } from 'styled-components';

interface ITitleContainer {
  lineColor: string;
}

export const Wrapper = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;

  margin-bottom: 25px;

  @media (max-width: 320px) {
    flex-direction: column;
  }
`;

export const TitleContainer = styled.div<ITitleContainer>`
  ${({ theme, lineColor }) => css`
    > h1 {
      color: ${theme.colors.white};

      &:after {
        content: '';
        display: block;
        width: 55px;
        border-bottom: 10px solid ${lineColor};
      }
    }

    @media (max-width: 420px) {
      > h1 {
        font-size: 22px;

        &:after {
          content: '';
          display: block;
          width: 55px;
          border-bottom: 5px solid ${lineColor};
        }
      }
    }
  `}
`;
export const Controllers = styled.div`
  display: flex;

  @media (max-width: 320px) {
    width: 100%;

    justify-content: space-around;

    margin-top: 20px;
  }
`;
