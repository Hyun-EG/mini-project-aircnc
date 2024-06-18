import { useState, useEffect } from 'react';
import CardView from '../Components/CardView.tsx';
import { MockData } from '../assets/interfaces.ts';

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
      {listings.map((listing) => (
        <CardView
          key={listing.name + listing.address}
          photo={listing.photo}
          name={listing.name}
          address={listing.address}
          rooms={`${listing.rooms}개의 방을 예약할 수 있습니다`}
        />
      ))}
    </>
  );
}

export default CardListingPage;
