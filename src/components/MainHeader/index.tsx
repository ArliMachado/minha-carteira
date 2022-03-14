import { useContext, useMemo, useState } from 'react';

import { useTheme } from 'hooks/theme';
import emojis from 'utils/emojis';
import * as S from './styles';
import { AuthContext } from 'hooks/auth';
import Toggle from 'components/Toggle';

const MainHeader = () => {
  const { toggleTheme, theme } = useTheme();

  const [darkTheme, setDarkTheme] = useState(() =>
    theme.title === 'dark' ? true : false,
  );

  const { user } = useContext(AuthContext);

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
        <S.UserName>{user?.name}</S.UserName>
      </S.Profile>
    </S.Wrapper>
  );
};

export default MainHeader;
