import * as S from './styles';

interface IToggleProps {
  labelLeft: string;
  labelRight: string;
  checked: boolean;
  onChange(): void;
}

const Toggle = ({ labelLeft, labelRight, checked, onChange }: IToggleProps) => (
  <S.Wrapper>
    <S.ToggleLabel>{labelLeft}</S.ToggleLabel>
    <S.ToggleSelector
      checked={checked}
      uncheckedIcon={false}
      checkedIcon={false}
      onChange={onChange}
    />
    <S.ToggleLabel>{labelRight}</S.ToggleLabel>
  </S.Wrapper>
);

export default Toggle;
