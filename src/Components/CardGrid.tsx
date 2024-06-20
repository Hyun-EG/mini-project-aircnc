import styled from 'styled-components';
import Card from './Card.tsx';
import { RoomData } from '../assets/interfaces.ts';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin: 0;
  width: 100%;
`;

interface CardGridProps {
  listings: RoomData[];
}

export default function CardGrid({ listings }: CardGridProps) {
  return (
    <GridContainer>
      {listings.map((listing) => (
        <Card
          key={listing.id}
          id={listing.id}
          image_url={listing.image_url}
          name={listing.name}
          address={listing.address}
          price={listing.price}
        />
      ))}
    </GridContainer>
  );
}
