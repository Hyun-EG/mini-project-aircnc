import styled from 'styled-components';
import Button from '../Button.tsx';
import { CITY_NAME, City } from '../../schema/roomSchema.ts';

const SearchLocationLayout = styled.menu`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  width: fit-content;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  row-gap: 0.5rem;
  column-gap: 0.5rem;
  padding: 0.5rem;
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 16px;
  @media (min-width: 601px) {
    padding: 1rem;
  }
`;

interface SearchLocationProps {
  onClick: (location: City) => void;
}

function HeaderSearchLocation({ onClick }: SearchLocationProps) {
  return (
    <SearchLocationLayout>
      {CITY_NAME.map((city) => (
        <li key={city}>
          <Button
            $size="small"
            $shape="rounded"
            $color="white"
            $border
            onClick={() => {
              onClick(city);
            }}
          >
            {city}
          </Button>
        </li>
      ))}
    </SearchLocationLayout>
  );
}

export default HeaderSearchLocation;
