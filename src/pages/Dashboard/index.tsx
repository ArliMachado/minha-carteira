import { useMemo, useState } from 'react';

import * as S from './styles';

import ContentHeader from 'components/ContentHeader';
import Layout from 'components/Layout';
import SelectInput from 'components/SelectInput';
import WalletBox from 'components/WalletBox';

import expenses from 'repositories/expenses';
import gains from 'repositories/gains';
import listOfMonths from 'utils/months';
import MessageBox from 'components/MessageBox';

import happyImg from 'assets/happy.svg';
import sadImg from 'assets/sad.svg';
import grinningImg from 'assets/grinning.svg';
import opsImg from 'assets/ops.svg';
import PieChartBox from 'components/PieChartBox';
import HistoryBox from 'components/HistoryBox';
import BarChartBox from 'components/BarChartBox';

export default function Dashboard() {
  const [monthSelected, setMonthSelected] = useState<number>(
    // new Date().getMonth() + 1,
    1,
  );
  const [yearSelected, setYearSelected] = useState<number>(
    // new Date().getFullYear(),
    2020,
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

  const totalExpenses = useMemo(() => {
    let total = 0;
    expenses.forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch {
          throw new Error('Invalid amount');
        }
      }
    });

    return total;
  }, [monthSelected, yearSelected]);

  const totalGains = useMemo(() => {
    let total = 0;
    gains.forEach(item => {
      const date = new Date(item.date);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;

      if (month === monthSelected && year === yearSelected) {
        try {
          total += Number(item.amount);
        } catch {
          throw new Error('Invalid amount');
        }
      }
    });

    return total;
  }, [monthSelected, yearSelected]);

  const totalBalance = useMemo(() => {
    return totalGains - totalExpenses;
  }, [totalGains, totalExpenses]);

  const message = useMemo(() => {
    if (totalBalance < 0) {
      return {
        title: 'Que triste!',
        description: 'Neste mês, você gastou mais do que deveria.',
        footerText:
          'Verifique seus gastos e tente cortar algumas coisas desnecessárias.',
        icon: sadImg,
      };
    } else if (totalGains === 0 && totalExpenses === 0) {
      return {
        title: "Op's!",
        description: 'Neste mês, não há registros de entradas ou saídas.',
        footerText:
          'Parece que você não fez nenhum registro no mês e ano selecionado.',
        icon: opsImg,
      };
    } else if (totalBalance === 0) {
      return {
        title: 'Ufaa!',
        description: 'Neste mês, você gastou exatamente o que ganhou.',
        footerText: 'Tenha cuidado. No próximo tente poupar o seu dinheiro.',
        icon: grinningImg,
      };
    } else {
      return {
        title: 'Muito bem!',
        description: 'Sua carteira está positiva!',
        footerText: 'Continue assim. Considere investir o seu saldo.',
        icon: happyImg,
      };
    }
  }, [totalBalance, totalGains, totalExpenses]);

  const relationExpensesVersusGains = useMemo(() => {
    const total = totalGains + totalExpenses;

    const percentGains = Number(((totalGains / total) * 100).toFixed(1));
    const percentExpenses = Number(((totalExpenses / total) * 100).toFixed(1));

    const data = [
      {
        name: 'Entradas',
        value: totalGains,
        percent: percentGains ? percentGains : 0,
        color: '#F7931B',
      },
      {
        name: 'Saídas',
        value: totalExpenses,
        percent: percentExpenses ? percentExpenses : 0,
        color: '#E44C4E',
      },
    ];

    return data;
  }, [totalGains, totalExpenses]);

  const relationExpensevesRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    expenses
      .filter(expense => {
        const date = new Date(expense.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        return month === monthSelected && year === yearSelected;
      })
      .forEach(expense => {
        if (expense.frequency === 'recorrente') {
          return (amountRecurrent += Number(expense.amount));
        }

        if (expense.frequency === 'eventual') {
          return (amountEventual += Number(expense.amount));
        }
      });

    const total = amountRecurrent + amountEventual;

    const percentRecurrent = Number(
      ((amountRecurrent / total) * 100).toFixed(1),
    );
    const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

    return [
      {
        name: 'Recorrentes',
        amount: amountRecurrent,
        percent: percentRecurrent ? percentRecurrent : 0,
        color: '#F7931B',
      },
      {
        name: 'Eventuais',
        amount: amountEventual,
        percent: percentEventual ? percentEventual : 0,
        color: '#E44C4E',
      },
    ];
  }, [monthSelected, yearSelected]);

  const relationGainsRecurrentVersusEventual = useMemo(() => {
    let amountRecurrent = 0;
    let amountEventual = 0;

    gains
      .filter(gain => {
        const date = new Date(gain.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;

        return month === monthSelected && year === yearSelected;
      })
      .forEach(gain => {
        if (gain.frequency === 'recorrente') {
          return (amountRecurrent += Number(gain.amount));
        }

        if (gain.frequency === 'eventual') {
          return (amountEventual += Number(gain.amount));
        }
      });

    const total = amountRecurrent + amountEventual;

    const percentRecurrent = Number(
      ((amountRecurrent / total) * 100).toFixed(1),
    );
    const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

    return [
      {
        name: 'Recorrentes',
        amount: amountRecurrent,
        percent: percentRecurrent ? percentRecurrent : 0,
        color: '#F7931B',
      },
      {
        name: 'Eventuais',
        amount: amountEventual,
        percent: percentEventual ? percentEventual : 0,
        color: '#E44C4E',
      },
    ];
  }, [monthSelected, yearSelected]);

  const historyData = useMemo(() => {
    return listOfMonths.map((_, month) => {
      let amountEntry = 0;
      let amountOutput = 0;

      gains.forEach(gain => {
        const date = new Date(gain.date);
        const gainMonth = date.getMonth();
        const gainYear = date.getFullYear();

        if (gainMonth === month && gainYear === yearSelected) {
          try {
            amountEntry += Number(gain.amount);
          } catch {
            throw new Error('amountEntry is invalid');
          }
        }
      });

      expenses.forEach(expense => {
        const date = new Date(expense.date);
        const expenseMonth = date.getMonth();
        const expenseYear = date.getFullYear();

        if (expenseMonth === month && expenseYear === yearSelected) {
          try {
            amountOutput += Number(expense.amount);
          } catch {
            throw new Error('amountOutput is invalid');
          }
        }
      });

      return {
        monthNumber: month,
        month: listOfMonths[month].substring(0, 3),
        amountEntry,
        amountOutput,
      };
    });
    // .filter(item => {
    //   const currentMonth = new Date().getMonth();
    //   const currentYear = new Date().getFullYear();

    //   return;
    //   (yearSelected === currentYear && item.monthNumber <= currentMonth) ||
    //     yearSelected < currentYear;
    // });
  }, [yearSelected]);

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
            amount={totalBalance}
            footerLabel="atualizado com base nas entradas e saídas"
            icon="dollar"
          />
          <WalletBox
            title="entradas"
            color="#F7931B"
            amount={totalGains}
            footerLabel="atualizado com base nas entradas e saídas"
            icon="arrowUp"
          />
          <WalletBox
            title="saídas"
            color="#E44C4E"
            amount={totalExpenses}
            footerLabel="atualizado com base nas entradas e saídas"
            icon="arrowDown"
          />

          <MessageBox {...message} />

          <PieChartBox data={relationExpensesVersusGains} />

          <HistoryBox
            data={historyData}
            lineColorAmountEntry="#F7931B"
            lineColorAmountOutput="#E44C4E"
          />

          <BarChartBox
            data={relationGainsRecurrentVersusEventual}
            title="Entradas"
          />

          <BarChartBox
            data={relationExpensevesRecurrentVersusEventual}
            title="Saídas"
          />
        </S.Content>
      </S.Wrapper>
    </Layout>
  );
}
