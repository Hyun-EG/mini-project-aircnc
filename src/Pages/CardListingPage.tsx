import { useState, useEffect } from 'react';
import styled from 'styled-components';
import CardGrid from '../Components/CardGrid.tsx';
import { RoomDetailData, RoomData } from '../assets/interfaces.ts';
import Header from '../Components/Header/Header.tsx';

const BodyContainer = styled.div`
  margin-top: 13vh;
  padding: 20px;
`;

function CardListingPage() {
  const [listings, setListings] = useState<RoomData[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('/src/assets/room_data.json');
        const data: RoomDetailData[] = await response.json();
        const formattedData = data.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          address: item.address,
          image_url: item.image_url,
        }));
        setListings(formattedData);
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
        <CardGrid listings={listings} fullWidth />
      </BodyContainer>
    </>
  );
}

export default CardListingPage;
