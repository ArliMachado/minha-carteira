import * as S from './styles';
import {
  MdDashboard,
  MdArrowDownward,
  MdArrowUpward,
  MdExitToApp,
} from 'react-icons/md';
import Link from 'next/link';

const Aside = () => (
  <S.Wrapper>
    <S.Header>
      <S.LogoImg src={'/assets/logo.svg'} alt="Logo Minha Carteira" />
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
      <S.MenuItemLink href="#">
        <MdExitToApp />
        Sair
      </S.MenuItemLink>
    </S.MenuContainer>
  </S.Wrapper>
);

export default Aside;
