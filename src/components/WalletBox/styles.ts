import styled, { css } from 'styled-components';

interface IWrapperProps {
  color: string;
}

export const Wrapper = styled.div<IWrapperProps>`
  ${({ theme, color }) => css`
    width: 32%;
    height: 150px;
    margin: 10px 0;

    background-color: ${color};
    color: ${theme.colors.white};

    border-radius: 7px;
    padding: 10px 20px;

    position: relative;
    overflow: hidden;

    > span {
      font-size: 18px;
      font-weight: 500;
    }

    > small {
      font-size: 12px;
      position: absolute;
      bottom: 10px;
    }
  `}
`;

export const IconContent = styled.div`
  position: absolute;

  height: 110%;
  width: 100%;

  top: -10px;
  right: -130px;

  opacity: 0.3;
`;
