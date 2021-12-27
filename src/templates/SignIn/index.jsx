import Image from 'next/image';

import * as S from './styles';
import logoImg from 'assets/logo.svg';
import Input from 'components/Input';
import Button from 'components/Button';

export default function SignIn() {
  return (
    <S.Wrapper>
      <S.Logo>
        <Image width={40} height={40} src={logoImg} alt="Minha Carteira" />
        <h2>Minha Carteira </h2>
      </S.Logo>

      <S.Form onSubmit={() => {}}>
        <S.FormTitle>Entrar</S.FormTitle>
        <Input placeholder="Email" required type="email" />
        <Input placeholder="Senha" required type="password" />
        <Button type="submit">Acessar</Button>
      </S.Form>
    </S.Wrapper>
  );
}
