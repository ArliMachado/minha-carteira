import Link from 'next/link';
import {
  MdDashboard,
  MdArrowDownward,
  MdArrowUpward,
  MdExitToApp,
} from 'react-icons/md';

import * as S from './styles';

import logo from 'assets/logo.svg';
import { useContext } from 'react';
import { AuthContext, signOut } from 'hooks/auth';

const Aside = () => {
  function handleSignOut() {
    signOut();
  }
  return (
    <S.Wrapper>
      <S.Header>
        <S.LogoImg src={logo} alt="Logo Minha Carteira" />
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
    </S.Wrapper>
  );
};

export default Aside;
