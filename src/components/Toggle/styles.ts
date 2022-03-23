import styled from 'styled-components';
import Switch, { ReactSwitchProps } from 'react-switch';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ToggleLabel = styled.span`
  color: ${({ theme }) => theme.colors.white};
`;

export const ToggleSelector = styled(Switch).attrs<ReactSwitchProps>(
  ({ theme }) => ({
    onColor: theme.colors.info,
    offColor: theme.colors.warning,
  }),
)<ReactSwitchProps>`
  margin: 0 7px;
`;
