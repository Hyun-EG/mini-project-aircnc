import styled from 'styled-components';
import Card from './Card.tsx';
import { MockData } from '../assets/interfaces.ts';

const GridContainer = styled.div<{ fullWidth: boolean }>`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${(props) => (props.fullWidth ? '300px' : '150px')}, 1fr)
  );
  gap: 25px;
  margin: ${(props) => (props.fullWidth ? '0 auto' : '0')};
  width: ${(props) => (props.fullWidth ? '100%' : '50%')};
`;

interface CardGridProps {
  listings: MockData[];
  fullWidth?: boolean;
}

export default function CardGrid({
  listings,
  fullWidth = false,
}: CardGridProps) {
  return (
    <GridContainer fullWidth={fullWidth}>
      {listings.map((listing) => (
        <Card
          key={listing.name + listing.address}
          photo={listing.photo}
          name={listing.name}
          address={listing.address}
          rooms={`${listing.rooms}개의 방을 예약할 수 있습니다`}
        />
      ))}
    </GridContainer>
  );
}
