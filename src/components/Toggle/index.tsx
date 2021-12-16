import * as S from './styles';

const Toggle = () => (
  <S.Wrapper>
    <S.ToggleLabel>Light</S.ToggleLabel>
    <S.ToggleSelector
      checked
      uncheckedIcon={false}
      checkedIcon={false}
      onChange={() => console.log('mudou')}
    />
    <S.ToggleLabel>Dark</S.ToggleLabel>
  </S.Wrapper>
);

export default Toggle;
