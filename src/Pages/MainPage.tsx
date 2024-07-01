import { useState, useEffect } from 'react';
import styled from 'styled-components';
import CardGrid from '../Components/CardGrid.tsx';
import { RoomDetailData } from '../assets/interfaces.ts';
import Header from '../Components/Header/Header.tsx';

const BodyContainer = styled.div`
  margin-top: 13vh;
  padding: 20px;
`;

function MainPage() {
  const [listings, setListings] = useState<RoomDetailData[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('/src/assets/room_data.json');
        const data: RoomDetailData[] = await response.json();
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  return (
    <>
      <header>
        <Header />
      </header>
      <BodyContainer>
        <CardGrid listings={listings} />
      </BodyContainer>
    </>
  );
}

export default MainPage;
