import CountUp from 'react-countup';

import * as S from './styles';

import dollarImg from 'assets/dollar.svg';
import arrowUpImg from 'assets/arrow-up.svg';
import arrowDownImg from 'assets/arrow-down.svg';

interface IWalletBoxProps {
  title: string;
  amount: number;
  footerLabel: string;
  icon: 'dollar' | 'arrowUp' | 'arrowDown';
  color: string;
}

const iconTypes = {
  dollar: dollarImg,
  arrowUp: arrowUpImg,
  arrowDown: arrowDownImg,
};

const WalletBox = ({
  title,
  amount,
  footerLabel,
  icon,
  color,
}: IWalletBoxProps) => (
  <S.Wrapper color={color}>
    <span>{title}</span>
    <h1>
      <CountUp
        end={amount}
        duration={1}
        delay={0}
        prefix={'R$ '}
        separator="."
        decimal=","
        decimals={2}
      />
    </h1>
    <small>{footerLabel}</small>
    <S.IconContent>
      <S.Icon src={iconTypes[icon]} layout="fill" alt={title} />
    </S.IconContent>
  </S.Wrapper>
);

export default WalletBox;
