import { useMemo, useState } from 'react';

import * as S from './styles';

import ContentHeader from 'components/ContentHeader';
import Layout from 'components/Layout';
import SelectInput from 'components/SelectInput';
import WalletBox from 'components/WalletBox';

import expenses from 'repositories/expenses';
import gains from 'repositories/gains';
import listOfMonths from 'utils/months';

export default function Dashboard() {
  const [monthSelected, setMonthSelected] = useState<number>(
    new Date().getMonth() + 1,
  );
  const [yearSelected, setYearSelected] = useState<number>(
    new Date().getFullYear(),
  );

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

    [...expenses, ...gains].forEach(item => {
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
  }, []);

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
  return (
    <Layout>
      <S.Wrapper>
        <ContentHeader title="Dashboard" lineColor="#f7931B">
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

        <S.Content>
          <WalletBox
            title="saldo"
            color="#4E41F0"
            amount={150.0}
            footerLabel="atualizado com base nas entradas e saídas"
            icon="dollar"
          />
          <WalletBox
            title="entradas"
            color="#F7931B"
            amount={5000.0}
            footerLabel="atualizado com base nas entradas e saídas"
            icon="arrowUp"
          />
          <WalletBox
            title="saídas"
            color="#E44C4E"
            amount={4850.0}
            footerLabel="atualizado com base nas entradas e saídas"
            icon="arrowDown"
          />
        </S.Content>
      </S.Wrapper>
    </Layout>
  );
}
