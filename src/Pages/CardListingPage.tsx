import { useState, useEffect } from 'react';
import styled from 'styled-components';
import CardGrid from '../Components/CardGrid.tsx';
// import CardView from '../Components/CardView.tsx';
import { MockData } from '../assets/interfaces.ts';
import Header from '../Components/Header/Header.tsx';

const BodyContainer = styled.div`
  margin-top: 13vh;
  padding: 20px;
`;

function CardListingPage() {
  const [listings, setListings] = useState<MockData[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('/src/assets/mockdata.json');
        const data = await response.json();
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
        <CardGrid listings={listings} fullWidth />
        {/* {listings.map((listing) => (
          <CardView
            key={listing.name + listing.address}
            photo={listing.photo}
            name={listing.name}
            address={listing.address}
            rooms={`${listing.rooms}개의 방을 예약할 수 있습니다`}
          />
        ))} */}
      </BodyContainer>
    </>
  );
}

export default CardListingPage;
