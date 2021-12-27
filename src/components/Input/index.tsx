import { InputHTMLAttributes } from 'react';
import * as S from './styles';

type IInputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = ({ ...rest }: IInputProps) => <S.Wrapper {...rest} />;

export default Input;
