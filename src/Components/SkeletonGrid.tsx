import styled, { keyframes } from 'styled-components';
import { CardContainer, ImageContainer, Image } from './Card.tsx';
import { GridContainer } from './CardGrid.tsx';

export const SkeletonFade = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
  100% {
    opacity: 1;
  }
`;

const SkeletonCardContainer = styled(CardContainer)`
  cursor: default;
`;

const SkeletonImageContainer = styled(ImageContainer)``;

export const SkeletonObject = styled.div`
  background-color: #ddd;
  animation: ${SkeletonFade} 2.4s ease-in-out 1s infinite;
`;

const SkeletonImage = styled(SkeletonObject)`
  ${Image};
  position: absolute;
  left: 10px;
  top: 10px;
  width: calc(100% - 20px);
  height: 100%;
`;

const SkeletonTitle = styled(SkeletonObject)`
  width: 160px;
  height: 20px;
  border-radius: 4px;
  margin: 10px;
`;

const SkeletonText = styled(SkeletonObject)`
  width: 120px;
  height: 15px;
  border-radius: 4px;
  margin: 10px;
`;

function SkeletonCard() {
  return (
    <SkeletonCardContainer>
      <SkeletonImageContainer>
        <SkeletonImage />
      </SkeletonImageContainer>
      <SkeletonTitle />
      <SkeletonText />
      <SkeletonText />
    </SkeletonCardContainer>
  );
}

function SkeletonGrid() {
  return (
    <GridContainer>
      {Array.from({ length: 12 }, (_v, i) => i).map((cardIndex) => (
        <SkeletonCard key={cardIndex} />
      ))}
    </GridContainer>
  );
}

export default SkeletonGrid;
