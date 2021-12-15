import Aside from 'components/Aside';
import Content from 'components/Content';
import MainHeader from 'components/MainHeader';
import * as S from './styles';

const Layout = () => (
  <S.Grid>
    <MainHeader />
    <Aside />
    <Content />
  </S.Grid>
);

export default Layout;
