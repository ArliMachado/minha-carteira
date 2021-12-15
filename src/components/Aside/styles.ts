import styled from 'styled-components';

export const Wrapper = styled.div`
  grid-area: AS;

  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.secondary};
`;
