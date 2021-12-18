import Toggle from 'components/Toggle';
import { useMemo } from 'react';
import emojis from 'utils/emojis';
import * as S from './styles';

const MainHeader = () => {
  const emoji = useMemo(() => {
    // const indice = Math.floor(Math.random() * emojis.length);
    return emojis[1];
  }, []);

  return (
    <S.Wrapper>
      <Toggle />

      <S.Profile>
        <S.Welcome>Olá, {emoji}</S.Welcome>
        <S.UserName>Arli Machado </S.UserName>
      </S.Profile>
    </S.Wrapper>
  );
};

export default MainHeader;
