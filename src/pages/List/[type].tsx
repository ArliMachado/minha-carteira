import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import ContentHeader from 'components/ContentHeader';
import HistoryfinanceCard from 'components/HistoryfinanceCard';
import Layout from 'components/Layout';
import SelectInput from 'components/SelectInput';

import expenses from 'repositories/expenses';
import gains from 'repositories/gains';

import * as S from './styles';
import formatCurrency from 'utils/formatCurrency';
import formatDate from 'utils/formatDate';

interface IData {
  id: number;
  description: string;
  amountFormatted: string;
  frequency: string;
  dataFormatted: string;
  tagColor: string;
}

export default function List() {
  const router = useRouter();
  const [data, setData] = useState<IData[]>([]);
  const { type } = router.query;

  const title = useMemo(() => {
    return type === 'entry-balance' ? 'Entradas' : 'Saídas';
  }, [type]);

  const listData = useMemo(() => {
    return type === 'entry-balance' ? gains : expenses;
  }, [type]);

  const lineColor = useMemo(() => {
    return type === 'entry-balance' ? '#F7931B' : '#E44C4E';
  }, [type]);

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

  useEffect(() => {
    const response = listData.map(item => {
      return {
        id: Math.random() * listData.length,
        amountFormatted: formatCurrency(Number(item.amount)),
        dataFormatted: formatDate(item.date),
        description: item.description,
        frequency: item.frequency,
        tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E',
      };
    });
    setData(response);
  }, [listData]);

  return (
    <Layout>
      <S.Wrapper>
        <ContentHeader title={title} lineColor={lineColor}>
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
          {data.map(item => (
            <HistoryfinanceCard
              key={item.id}
              tagColor={item.tagColor}
              title={item.description}
              subtitle={item.dataFormatted}
              amount={item.amountFormatted}
            />
          ))}
        </S.Content>
      </S.Wrapper>
    </Layout>
  );
}
