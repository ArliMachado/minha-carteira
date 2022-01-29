import Button from 'components/Button';
import React from 'react';
import * as S from './styles';

interface IItemCardProps {
  tagColor: string;
  title: string;
  subtitle: string;
  // children: React.ReactNode;
}

const ItemCard = ({ tagColor, title, subtitle }: IItemCardProps) => (
  <S.Wrapper>
    <S.Tag color={tagColor} />

    <div>
      <span>{title}</span>
      <small>{subtitle}</small>
    </div>
    <div>
      <Button type="button">Editar</Button>
    </div>
  </S.Wrapper>
);

export default ItemCard;
