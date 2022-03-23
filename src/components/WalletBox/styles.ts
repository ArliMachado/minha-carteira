import Image from 'next/image';
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

    @media (max-width: 770px) {
      > span {
        font-size: 14px;
      }

      > h1 {
        word-wrap: break-word;
        font-size: 22px;

        strong {
          display: inline-block;
          width: 100%;
          font-size: 16px;
        }
      }
    }

    @media (max-width: 420px) {
      width: 100%;

      > h1 {
        display: flex;
        strong {
          position: initial;
          width: auto;
          font-size: 22px;
        }
        strong:after {
          display: inline-block;
          content: '';
          width: 2px;
        }
    }
  `}
`;

export const IconContent = styled.div`
  position: relative;

  height: 120%;
  width: 100%;

  top: -70px;
  right: -130px;

  opacity: 0.3;
`;

export const Icon = styled(Image)`
  position: absolute;
`;
