import styled from 'styled-components';
import { SkeletonObject } from './SkeletonGrid.tsx';
import { CardContainer, ImageContainer, TextContainer } from './DetailCard.tsx';

const SkeletonCardContainer = styled(CardContainer)`
  padding: 0;
  padding-left: 10px;
`;

const SkeletonImage = styled(SkeletonObject)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const SkeletonCardTitle = styled(SkeletonObject)`
  width: 320px;
  height: 3.5vh;
  border-radius: 8px;
`;

const SkeletonCardText = styled(SkeletonObject)`
  width: 280px;
  height: 16px;
  margin: 10px 0;
  border-radius: 4px;
`;

function SkeletonDetailCard() {
  return (
    <SkeletonCardContainer>
      <ImageContainer>
        <SkeletonImage />
      </ImageContainer>
      <TextContainer>
        <SkeletonCardTitle />
        <SkeletonCardText />
        <SkeletonCardText />
      </TextContainer>
    </SkeletonCardContainer>
  );
}

export default SkeletonDetailCard;
