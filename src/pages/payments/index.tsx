import ContentHeader from 'components/ContentHeader';
import ItemCard from 'components/ItemCard';
import Layout from 'components/Layout';
import { useEffect, useState } from 'react';
import payments from 'repositories/payments';
import * as S from './styles';

interface IPaymentProps {
  id: number;
  name: string;
  status: string;
  // isActive: boolean;
}

export default function Payments() {
  const [data, setData] = useState<IPaymentProps[]>([]);

  useEffect(() => {
    const formattedData = payments.map(payment => {
      return {
        id: Math.random() * payments.length,
        name: payment.name,
        status: payment.isActive ? 'Ativo' : 'Inativo',
      };
    });

    setData(formattedData);
  }, []);

  return (
    <Layout>
      <S.Wrapper>
        <ContentHeader
          title="Meios de Pagamento"
          lineColor="#f7931B"
        ></ContentHeader>

        <S.Content>
          {data.map(payment => (
            <ItemCard
              key={payment.id}
              title={payment.name}
              subtitle={payment.status}
            />
          ))}
        </S.Content>
      </S.Wrapper>
    </Layout>
  );
}
