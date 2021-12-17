import * as S from './styles';
import {
  MdDashboard,
  MdArrowDownward,
  MdArrowUpward,
  MdExitToApp,
} from 'react-icons/md';

const Aside = () => (
  <S.Wrapper>
    <S.Header>
      <S.LogoImg src={'/assets/logo.svg'} alt="Logo Minha Carteira" />
      <S.Title>Minha Carteira</S.Title>
    </S.Header>

    <S.MenuContainer>
      <S.MenuItemLink href="#">
        <MdDashboard />
        Dashboard
      </S.MenuItemLink>
      <S.MenuItemLink href="#">
        <MdArrowUpward />
        Entradas
      </S.MenuItemLink>
      <S.MenuItemLink href="#">
        <MdArrowDownward />
        Saídas
      </S.MenuItemLink>
      <S.MenuItemLink href="#">
        <MdExitToApp />
        Sair
      </S.MenuItemLink>
    </S.MenuContainer>
  </S.Wrapper>
);

export default Aside;
