import ContentHeader from 'components/ContentHeader';
import ItemCard from 'components/ItemCard';
import Layout from 'components/Layout';
import { useEffect, useState } from 'react';
import categories from 'repositories/categories';
import * as S from './styles';

interface ICategoryProps {
  id: number;
  name: string;
  status: string;
  // isActive: boolean;
  tagColor: string;
}

export default function Categories() {
  const [data, setData] = useState<ICategoryProps[]>([]);

  useEffect(() => {
    const formattedData = categories.map(category => {
      return {
        id: Math.random() * categories.length,
        name: category.name,
        status: category.isActive ? 'Ativo' : 'Inativo',
        tagColor: category.tagColor,
      };
    });

    setData(formattedData);
  }, []);

  return (
    <Layout>
      <S.Wrapper>
        <ContentHeader title="Categorias" lineColor="#f7931B"></ContentHeader>

        <S.Content>
          {data.map(category => (
            <ItemCard
              key={category.id}
              title={category.name}
              subtitle={category.status}
              tagColor={category.tagColor}
            />
          ))}
        </S.Content>
      </S.Wrapper>
    </Layout>
  );
}
