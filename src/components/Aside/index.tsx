import Link from 'next/link';
import {
  MdDashboard,
  MdArrowDownward,
  MdArrowUpward,
  MdExitToApp,
  MdClose,
  MdMenu,
} from 'react-icons/md';

import * as S from './styles';

import logo from 'assets/logo.svg';
import { useTheme } from 'hooks/theme';
import Toggle from 'components/Toggle';
import { useState } from 'react';
import { signOut } from 'hooks/auth';

const Aside = () => {
  const { toggleTheme, theme } = useTheme();

  const [toggleMenuIsOpened, setToggleMenuIsOpened] = useState(false);
  const [darkTheme, setDarkTheme] = useState(() =>
    theme.title === 'dark' ? true : false,
  );

  const handleToggleMenu = () => {
    setToggleMenuIsOpened(!toggleMenuIsOpened);
  };

  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
    toggleTheme();
  };

  function handleSignOut() {
    signOut();
  }
  return (
    <S.Wrapper menuIsOpen={toggleMenuIsOpened}>
      <S.Header>
        <S.ToggleMenu onClick={handleToggleMenu}>
          {toggleMenuIsOpened ? <MdClose /> : <MdMenu />}
        </S.ToggleMenu>

        <S.LogoContainer>
          <S.LogoImg src={logo} alt="Logo Minha Carteira" />
        </S.LogoContainer>
        <S.Title>Minha Carteira</S.Title>
      </S.Header>

      <S.MenuContainer>
        <Link href="/dashboard">
          <S.MenuItemLink href="#">
            <MdDashboard />
            Dashboard
          </S.MenuItemLink>
        </Link>
        <Link href="/list/entry-balance">
          <S.MenuItemLink href="#">
            <MdArrowUpward />
            Entradas
          </S.MenuItemLink>
        </Link>
        <Link href="/list/exit-balance">
          <S.MenuItemLink href="#">
            <MdArrowDownward />
            Saídas
          </S.MenuItemLink>
        </Link>
        <S.MenuItemButton onClick={handleSignOut}>
          <MdExitToApp />
          Sair
        </S.MenuItemButton>
      </S.MenuContainer>

      <S.ThemeToggleFooter menuIsOpen={toggleMenuIsOpened}>
        <Toggle
          labelLeft="Light"
          labelRight="Dark"
          checked={darkTheme}
          onChange={handleChangeTheme}
        />
      </S.ThemeToggleFooter>
    </S.Wrapper>
  );
};

export default Aside;
