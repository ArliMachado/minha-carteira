import styled, { css } from 'styled-components';

interface ITagProps {
  color: string;
}

export const Wrapper = styled.li`
  ${({ theme }) => css`
    background-color: ${theme.colors.tertiary};

    list-style: none;
    border-radius: 10px;

    margin: 10px 0;
    padding: 12px 10px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    cursor: pointer;
    transition: all 0.3s;

    position: relative;

    &:hover {
      opacity: 0.7;
      transform: translateX(10px);
    }

    > div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      padding-left: 10px;

      > span {
        font-size: 20px;
        font-weight: bold;
      }
    }
  `}
`;
export const Tag = styled.div<ITagProps>`
  ${({ color }) => css`
    width: 13px;
    height: 60%;

    background-color: ${color};

    position: absolute;
    left: 0;
  `}
`;