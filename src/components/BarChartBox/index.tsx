import { ResponsiveContainer, BarChart, Bar, Cell, Tooltip } from 'recharts';
import formatCurrency from 'utils/formatCurrency';

import * as S from './styles';

interface IBarChartBoxProps {
  title: string;
  data: {
    name: string;
    amount: number;
    percent: number;
    color: string;
  }[];
}

const BarChartBox = ({ title, data }: IBarChartBoxProps) => (
  <S.Wrapper>
    <S.SideLeft>
      <h2>{title}</h2>

      <S.LegendContainer>
        {data.map(indicator => (
          <S.Legend key={indicator.name} color={indicator.color}>
            <div>{indicator.percent}%</div>
            <span>{indicator.name}</span>
          </S.Legend>
        ))}
      </S.LegendContainer>
    </S.SideLeft>

    <S.Sideright>
      <ResponsiveContainer>
        <BarChart data={data}>
          <Bar dataKey="amount" name="Valor">
            {data.map(indicator => (
              <Cell
                key={indicator.name}
                fill={indicator.color}
                cursor="pointer"
              />
            ))}
          </Bar>
          <Tooltip
            cursor={{ fill: 'none' }}
            formatter={(value: number) => formatCurrency(Number(value))}
          />
        </BarChart>
      </ResponsiveContainer>
    </S.Sideright>
  </S.Wrapper>
);

export default BarChartBox;
