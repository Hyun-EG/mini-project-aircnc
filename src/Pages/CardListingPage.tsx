import { useState, useEffect } from 'react';
import styled from 'styled-components';
import CardGrid from '../Components/CardGrid.tsx';
import { MockData } from '../assets/interfaces.ts';
import Header from '../Components/header/Header.tsx';

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
      </BodyContainer>
    </>
  );
}

export default CardListingPage;
