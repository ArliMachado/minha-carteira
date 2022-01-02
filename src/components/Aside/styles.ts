import Image from 'next/image';
import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  ${({ theme }) => css`
    grid-area: AS;

    background-color: ${theme.colors.secondary};
    padding-left: 20px;

    border-right: 1px solid ${theme.colors.gray};
  `}
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  height: 70px;
`;
export const LogoImg = styled(Image).attrs({
  height: 40,
  width: 40,
})``;
export const Title = styled.h3`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    margin-left: 10px;
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
