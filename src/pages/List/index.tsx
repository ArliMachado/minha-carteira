import ContentHeader from 'components/ContentHeader';
import HistoryfinanceCard from 'components/HistoryfinanceCard';
import SelectInput from 'components/SelectInput';

import * as S from './styles';

export default function List() {
  const options = [
    {
      value: 'João',
      label: 'João',
    },
    {
      value: 'Pedro',
      label: 'Pedro',
    },
    {
      value: 'Ana',
      label: 'Ana',
    },
  ];
  return (
    <S.Wrapper>
      <ContentHeader title="Saídas" lineColor="#E44C4E">
        <SelectInput options={options} />
      </ContentHeader>
      <S.Content>
        <HistoryfinanceCard
          tagColor="#E44C4E"
          title="Conta de Luz"
          subtitle="27/07/2021"
          amount="R$ 130,00"
        />
      </S.Content>
    </S.Wrapper>
  );
}
