import styled from 'styled-components';
import Card from './Card.tsx';
import { RoomDetailData } from '../assets/interfaces.ts';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin: 0;
  width: 100%;
`;

interface CardGridProps {
  listings: RoomDetailData[];
}

export default function CardGrid({ listings }: CardGridProps) {
  return (
    // props spreading is forbidden,, eslint설정 진짜 중요하다..;
    <GridContainer>
      {listings.map((listing) => (
        <Card key={listing.id} {...listing} />
      ))}
    </GridContainer>
  );
}
