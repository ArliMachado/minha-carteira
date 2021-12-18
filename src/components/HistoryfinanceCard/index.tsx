import * as S from './styles';

interface IHistoryfinanceCardProps {
  tagColor: string;
  title: string;
  subtitle: string;
  amount: string;
}

const HistoryfinanceCard = ({
  tagColor,
  title,
  subtitle,
  amount,
}: IHistoryfinanceCardProps) => (
  <S.Wrapper>
    <S.Tag color={tagColor} />
    <div>
      <span>{title}</span>
      <small>{subtitle}</small>
    </div>
    <h3>{amount}</h3>
  </S.Wrapper>
);

export default HistoryfinanceCard;
