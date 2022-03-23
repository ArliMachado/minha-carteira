import { useState, FormEvent, useContext } from 'react';
import Image from 'next/image';

import * as S from './styles';
import logoImg from 'assets/logo.svg';
import Input from 'components/Input';
import Button from 'components/Button';
import { AuthContext } from 'hooks/auth';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useContext(AuthContext);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = { email, password };

    await signIn(data);
  }

  return (
    <S.Wrapper>
      <S.Logo>
        <Image width={40} height={40} src={logoImg} alt="Minha Carteira" />
        <h2>Minha Carteira </h2>
      </S.Logo>

      <S.Form onSubmit={handleSubmit}>
        <S.FormTitle>Entrar</S.FormTitle>
        <Input
          placeholder="Email"
          required
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          placeholder="Senha"
          required
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <Button type="submit">Acessar</Button>
      </S.Form>
    </S.Wrapper>
  );
}
