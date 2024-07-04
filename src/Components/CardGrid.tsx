import styled from 'styled-components';
import Card from './Card.tsx';
import { RoomResponse } from '../assets/interfaces.ts';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 300px));
  gap: 25px;
  margin: 0;
  width: 100%;
`;

interface CardGridProps {
  listings: RoomResponse[];
}

export default function CardGrid({ listings }: CardGridProps) {
  return (
    // props spreading is forbidden,, eslint설정 진짜 중요하다..;
    <GridContainer>
      {listings.map((listing, index) => (
        <Card key={listing.room_id} {...listing} order={index} />
      ))}
    </GridContainer>
  );
}
