import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import formatCurrency from 'utils/formatCurrency';

import * as S from './styles';

interface IHistoryBoxProps {
  data: {
    month: string;
    amountEntry: number;
    amountOutput: number;
  }[];
  lineColorAmountEntry: string;
  lineColorAmountOutput: string;
}

const HistoryBox = ({
  data,
  lineColorAmountEntry,
  lineColorAmountOutput,
}: IHistoryBoxProps) => (
  <S.Wrapper>
    <S.Header>
      <h2>Histórico de saldo</h2>
      <S.LegendContainer>
        <S.Legend color={lineColorAmountEntry}>
          <div></div>
          <span>Entradas</span>
        </S.Legend>
        <S.Legend color={lineColorAmountOutput}>
          <div></div>
          <span>Saídas</span>
        </S.Legend>
      </S.LegendContainer>
    </S.Header>

    <S.ChartContainer>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#cecece" />
          <XAxis dataKey="month" stroke="#cecece" />
          <Tooltip
            formatter={(value: number) => formatCurrency(Number(value))}
          />
          <Line
            type="monotone"
            dataKey="amountOutput"
            name="Saídas"
            stroke={lineColorAmountEntry}
            strokeWidth={5}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="amountEntry"
            name="Entradas"
            stroke={lineColorAmountOutput}
            strokeWidth={5}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </S.ChartContainer>
  </S.Wrapper>
);

export default HistoryBox;
