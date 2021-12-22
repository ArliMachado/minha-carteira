import styled, { css } from 'styled-components';

interface ILegendProps {
  color: string;
}

export const Wrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;

    display: flex;
    flex-direction: column;

    background-color: ${theme.colors.tertiary};
    color: ${theme.colors.white};

    margin: 10px 0;
    padding: 30px 20px;

    border-radius: 7px;
  `}
`;

export const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  > h2 {
    margin-bottom: 20px;
    padding-left: 18px;
  }
`;
export const LegendContainer = styled.ul`
  list-style: none;
  display: flex;
  padding-right: 18px;
`;
export const Legend = styled.li<ILegendProps>`
  display: flex;
  align-items: center;

  margin-bottom: 7px;
  margin-left: 7px;

  > div {
    background-color: ${({ color }) => color};

    width: 40px;
    height: 40px;
    border-radius: 5px;

    font-size: 14px;
    line-height: 40px;
    text-align: center;
  }
  > span {
    margin-left: 5px;
  }
`;

export const ChartContainer = styled.div`
  flex: 1;
  height: 260px;
`;
