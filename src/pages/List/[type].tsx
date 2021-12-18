import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import ContentHeader from 'components/ContentHeader';
import HistoryfinanceCard from 'components/HistoryfinanceCard';
import Layout from 'components/Layout';
import SelectInput from 'components/SelectInput';

import expenses from 'repositories/expenses';
import gains from 'repositories/gains';
import listOfMonths from 'utils/months';

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
  const [monthSelected, setMonthSelected] = useState<string>(
    String(new Date().getMonth() + 1),
  );
  const [yearSelected, setYearSelected] = useState<string>(
    String(new Date().getFullYear()),
  );

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

  const mounths = useMemo(() => {
    return listOfMonths.map((month, index) => {
      return {
        value: index + 1,
        label: month,
      };
    });
  }, []);
  const years = useMemo(() => {
    const uniqueYears: number[] = [];
    const currentYear = new Date().getFullYear();

    listData.forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();

      if (!uniqueYears.includes(year)) {
        uniqueYears.push(year);
      }
    });

    if (!uniqueYears.includes(currentYear)) {
      uniqueYears.push(currentYear);
    }

    return uniqueYears.map(year => {
      return {
        value: year,
        label: year,
      };
    });
  }, [listData]);

  function handleChangeMonth(value: string) {
    console.log(value);

    setMonthSelected(value);
  }

  function handleChangeYear(value: string) {
    setYearSelected(value);
  }

  useEffect(() => {
    const filteredData = listData.filter(item => {
      const date = new Date(item.date);
      const month = String(date.getMonth() + 1);
      const year = String(date.getFullYear());

      return month === monthSelected && year === yearSelected;
    });

    const formattedData = filteredData.map(item => {
      return {
        id: Math.random() * listData.length,
        amountFormatted: formatCurrency(Number(item.amount)),
        dataFormatted: formatDate(item.date),
        description: item.description,
        frequency: item.frequency,
        tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E',
      };
    });

    setData(formattedData);
  }, [listData, monthSelected, yearSelected]);

  return (
    <Layout>
      <S.Wrapper>
        <ContentHeader title={title} lineColor={lineColor}>
          <SelectInput
            options={mounths}
            defaultValue={monthSelected}
            onChange={e => handleChangeMonth(e.target.value)}
          />
          <SelectInput
            options={years}
            defaultValue={yearSelected}
            onChange={e => handleChangeYear(e.target.value)}
          />
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
