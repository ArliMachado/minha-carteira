import styled, { css } from 'styled-components';

interface ILegendProps {
  color: string;
}

export const Wrapper = styled.div`
  ${({ theme }) => css`
    width: 48%;
    min-height: 260px;

    background-color: ${theme.colors.tertiary};
    color: ${theme.colors.white};

    border-radius: 7px;

    display: flex;
  `}
`;

export const SideLeft = styled.aside`
  flex: 1;
  padding: 30px 20px;

  > h2 {
    margin-bottom: 10px;
    padding-left: 16px;
  }
`;

export const LegendContainer = styled.ul`
  list-style: none;

  height: 175px;
  padding-right: 15px;
  overflow-y: scroll;

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

export const Legend = styled.li<ILegendProps>`
  display: flex;
  align-items: center;

  margin-bottom: 7px;

  padding-left: 16px;

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

export const Sideright = styled.main`
  flex: 1;
  min-height: 150px;
  display: flex;
  justify-content: center;
  padding-top: 35px;
`;
