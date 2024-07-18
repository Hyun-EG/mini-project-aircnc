import styled from 'styled-components';
import Card from './Card.tsx';
import { RoomResponse } from '../assets/interfaces.ts';

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 300px));
  gap: 3vh;
  margin: 0;
  width: 100%;
  justify-content: center;
`;

interface CardGridProps {
  listings: RoomResponse[];
}

export default function CardGrid({ listings }: CardGridProps) {
  return (
    <GridContainer>
      {listings.map((listing, index) => (
        <Card key={listing.room_id} card={listing} order={index} />
      ))}
    </GridContainer>
  );
}
