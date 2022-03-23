import { ButtonHTMLAttributes } from 'react';
import * as S from './styles';

type IButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, ...rest }: IButtonProps) => (
  <S.Wrapper {...rest}>{children}</S.Wrapper>
);

export default Button;
