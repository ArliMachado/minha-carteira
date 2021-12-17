import Aside from 'components/Aside';
import Content from 'components/Content';
import MainHeader from 'components/MainHeader';
import React from 'react';
import * as S from './styles';

const Layout = ({ children }) => (
  <S.Grid>
    <MainHeader />
    <Aside />
    <Content>{children}</Content>
  </S.Grid>
);

export default Layout;
