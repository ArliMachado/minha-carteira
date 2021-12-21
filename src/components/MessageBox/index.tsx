import * as S from './styles';

import Image from 'next/image';

interface IMessageBoxProps {
  title: string;
  description: string;
  footerText: string;
  icon: string;
}

const MessageBox = ({
  title,
  description,
  footerText,
  icon,
}: IMessageBoxProps) => (
  <S.Wrapper>
    <S.Header>
      <S.HeaderTitle>
        {title}
        <S.ImageWrapper>
          <Image src={icon} width={35} height={35} alt="happy emoji" />
        </S.ImageWrapper>
      </S.HeaderTitle>
      <p>{description}</p>
    </S.Header>
    <footer>
      <span>{footerText}</span>
    </footer>
  </S.Wrapper>
);

export default MessageBox;
