import ContentHeader from 'components/ContentHeader';
import HistoryfinanceCard from 'components/HistoryfinanceCard';
import SelectInput from 'components/SelectInput';

import * as S from './styles';

export default function List() {
  const mounths = [
    { value: 7, label: 'Julho' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Setembro' },
  ];
  const years = [
    { value: 2020, label: 2020 },
    { value: 2019, label: 2019 },
    { value: 2018, label: 2018 },
  ];
  return (
    <S.Wrapper>
      <ContentHeader title="Saídas" lineColor="#E44C4E">
        <SelectInput options={mounths} />
        <SelectInput options={years} />
      </ContentHeader>

      <S.Filters>
        <button type="button" className="tag-filter tag-filter-recurrent">
          Recorrentes
        </button>

        <button type="button" className="tag-filter tag-filter-eventual">
          Eventuais
        </button>
      </S.Filters>

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
