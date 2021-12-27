import Toggle from 'components/Toggle';
import { useTheme } from 'hooks/theme';
import { useMemo, useState } from 'react';
import emojis from 'utils/emojis';
import * as S from './styles';

const MainHeader = () => {
  const { toggleTheme, theme } = useTheme();

  const [darkTheme, setDarkTheme] = useState(() =>
    theme.title === 'dark' ? true : false,
  );

  const handleChangeTheme = () => {
    setDarkTheme(!darkTheme);
    toggleTheme();
  };

  const emoji = useMemo(() => {
    // const indice = Math.floor(Math.random() * emojis.length);
    return emojis[1];
  }, []);

  return (
    <S.Wrapper>
      <Toggle
        labelLeft="Light"
        labelRight="Dark"
        checked={darkTheme}
        onChange={handleChangeTheme}
      />

      <S.Profile>
        <S.Welcome>Olá, {emoji}</S.Welcome>
        <S.UserName>Arli Machado </S.UserName>
      </S.Profile>
    </S.Wrapper>
  );
};

export default MainHeader;
