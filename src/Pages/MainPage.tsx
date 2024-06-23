import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import CardGrid from '../Components/CardGrid.tsx';
import { RoomDetailData, RoomData } from '../assets/interfaces.ts';
import Header from '../Components/Header/Header.tsx';
import { setRooms } from '../store/slices/roomDetailSlice.ts';

const BodyContainer = styled.div`
  margin-top: 13vh;
  padding: 20px;
`;

function MainPage() {
  const [listings, setListings] = useState<RoomData[]>([]);
  const dispatch = useDispatch();

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
        dispatch(setRooms(data));
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, [dispatch]);

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
