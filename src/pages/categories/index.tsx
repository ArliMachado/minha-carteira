import ContentHeader from 'components/ContentHeader';
import ItemCard from 'components/ItemCard';
import Layout from 'components/Layout';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { setupAPIClient } from 'services/api';
import { withSSRAuth } from 'utils/withSSRAuth';
import * as S from './styles';

interface ICategoryProps {
  id: number;
  description: string;
  is_active: boolean;
  status?: string;
  // isActive: boolean;
  // tagColor: string;
}

interface ICategoriesProps {
  categories: ICategoryProps[];
}

export default function Categories({ categories }: ICategoriesProps) {
  const [data, setData] = useState<ICategoryProps[]>([]);

  return (
    <Layout>
      <S.Wrapper>
        <ContentHeader title="Categorias" lineColor="#f7931B"></ContentHeader>

        <S.Content>
          {categories.map(category => (
            <ItemCard
              key={category.id}
              title={category.description}
              subtitle="teste"
              tagColor="#f7931B"
            />
          ))}
        </S.Content>
      </S.Wrapper>
    </Layout>
  );
}

export const getServerSideProps = withSSRAuth(async ctx => {
  const apiClient = setupAPIClient(ctx);
  const response = await apiClient.get('/categories');

  const categories: ICategoryProps[] = response.data;

  const formattedData = categories.map(({ id, description, is_active }) => {
    return {
      id,
      description,
      is_active,
      status: is_active ? 'Ativo' : 'Inativo',
      tagColor: '03BB85',
    };
  });

  return {
    props: {
      categories: formattedData,
    },
  };
});
