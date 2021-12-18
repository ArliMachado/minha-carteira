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
  const [monthSelected, setMonthSelected] = useState<number>(
    new Date().getMonth() + 1,
  );
  const [yearSelected, setYearSelected] = useState<number>(
    new Date().getFullYear(),
  );
  const [selectedFrequency, setSelectedFrequency] = useState([
    'recorrente',
    'eventual',
  ]);

  const movimentType = router.query.type;

  const pageData = useMemo(() => {
    return movimentType === 'entry-balance'
      ? {
          title: 'Entradas',
          lineColor: '#F7931B',
          data: gains,
        }
      : {
          title: 'Saídas',
          lineColor: '#F7931B',
          data: expenses,
        };
  }, [movimentType]);

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

    pageData.data.forEach(item => {
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
  }, [pageData]);

  function handleChangeMonth(month: string) {
    try {
      const parseMonth = Number(month);
      setMonthSelected(parseMonth);
    } catch {
      throw new Error('Invalid month value. Is accept 0 - 24');
    }
  }

  function handleChangeYear(year: string) {
    try {
      const parseYear = Number(year);
      setYearSelected(parseYear);
    } catch {
      throw new Error('Invalid year value. Is accept integer numbers');
    }
  }

  function handleFrequencyClick(frequency: string) {
    const alreadySelected = selectedFrequency.findIndex(
      item => item === frequency,
    );

    if (alreadySelected >= 0) {
      const filtered = selectedFrequency.filter(item => item !== frequency);
      setSelectedFrequency(filtered);
    } else {
      setSelectedFrequency(prev => [...prev, frequency]);
    }
  }

  useEffect(() => {
    const { data } = pageData;
    const filteredData = data.filter(item => {
      const date = new Date(item.date);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return (
        month === monthSelected &&
        year === yearSelected &&
        selectedFrequency.includes(item.frequency)
      );
    });

    const formattedData = filteredData.map(item => {
      return {
        id: Math.random() * data.length,
        amountFormatted: formatCurrency(Number(item.amount)),
        dataFormatted: formatDate(item.date),
        description: item.description,
        frequency: item.frequency,
        tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E',
      };
    });

    setData(formattedData);
  }, [pageData, data.length, monthSelected, yearSelected, selectedFrequency]);

  return (
    <Layout>
      <S.Wrapper>
        <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
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
          <button
            type="button"
            className={`tag-filter tag-filter-recurrent
            ${selectedFrequency.includes('recorrente') && 'tag-actived'}`}
            onClick={() => handleFrequencyClick('recorrente')}
          >
            Recorrentes
          </button>

          <button
            type="button"
            className={`tag-filter tag-filter-eventual
            ${selectedFrequency.includes('eventual') && 'tag-actived'}`}
            onClick={() => handleFrequencyClick('eventual')}
          >
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
