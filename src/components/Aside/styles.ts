import Image from 'next/image';
import styled, { css } from 'styled-components';

interface IWrapperProps {
  menuIsOpen: boolean;
}

interface IThemeToggleFooterProps {
  menuIsOpen: boolean;
}

export const Wrapper = styled.div<IWrapperProps>`
  ${({ theme, menuIsOpen }) => css`
    grid-area: AS;

    background-color: ${theme.colors.secondary};
    padding-left: 20px;

    border-right: 1px solid ${theme.colors.gray};

    position: relative;

    @media (max-width: 600px) {
      padding-left: 20px;
      position: fixed;
      z-index: 2;

      width: 170px;

      height: ${menuIsOpen
        ? '100vh'
        : '70px'}; // 70px da altura da linha do grid da tela

      overflow: hidden;

      ${!menuIsOpen &&
      css`
        border: none;
        border-bottom: 1px solid ${theme.colors.gray};
      `}
    }
  `}
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  height: 70px;
`;

export const ToggleMenu = styled.button`
  width: 40px;
  height: 40px;

  border-radius: 5px;
  font-size: 22px;
  background-color: ${({ theme }) => theme.colors.warning};
  color: ${({ theme }) => theme.colors.white};

  transition: opacity 0.3;

  &:hover {
    opacity: 0.7;
  }

  display: none;
  @media (max-width: 600px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const LogoContainer = styled.div`
  @media (max-width: 600px) {
    display: none;
  }
`;

export const LogoImg = styled(Image).attrs({
  height: 40,
  width: 40,
})``;
export const Title = styled.h3`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    margin-left: 10px;

    @media (max-width: 600px) {
      display: none;
    }
  `};
`;
export const MenuContainer = styled.nav`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
`;
export const MenuItemLink = styled.a`
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.colors.info};
  text-decoration: none;
  margin: 7px 0;

  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }

  > svg {
    font-size: 18px;
    margin-right: 5px;
  }
`;
export const MenuItemButton = styled.button`
  font-size: 16px;

  display: flex;
  align-items: center;

  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.info};
  margin: 7px 0;

  transition: opacity 0.3s;

  &:hover {
    opacity: 0.7;
  }

  > svg {
    font-size: 18px;
    margin-right: 5px;
  }
`;

export const ThemeToggleFooter = styled.footer<IThemeToggleFooterProps>`
  display: none;
  position: absolute;
  bottom: 30px;

  @media (max-width: 470px) {
    display: ${({ menuIsOpen }) => (menuIsOpen ? 'flex' : 'none')};
  }
`;
