import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';
import { setLocation } from '../redux/slices/searchSlice.ts';
import CardGrid from '../Components/CardGrid.tsx';
import Header from '../Components/Header/Header.tsx';
import {
  getCurrentPosition,
  getAddressFromCoordinates,
} from '../util/currentLocationUtil.ts';
import { RoomData } from '../assets/interfaces.ts';

const BodyContainer = styled.div`
  margin-top: 13vh;
  padding: 20px;
`;

function MainPage() {
  const [listings, setListings] = useState<RoomData[]>([]);
  const dispatch = useDispatch();
  const location = useSelector((state: RootState) => state.search.location);

  useEffect(() => {
    const fetchLocationAndListings = async () => {
      try {
        const { latitude, longitude } = await getCurrentPosition();
        const address = await getAddressFromCoordinates(latitude, longitude);
        dispatch(setLocation(address));

        const response = await fetch('src/assets/room_data.json');
        const rooms: RoomData[] = await response.json();
        const filteredRooms = rooms.filter((room) =>
          room.city.includes(address),
        );
        setListings(filteredRooms.slice(0, 10));
      } catch (error) {
        if (error.code === 1) {
          console.warn('User denied Geolocation');
          dispatch(setLocation('서울'));
          try {
            const response = await fetch('src/assets/room_data.json');
            const rooms: RoomData[] = await response.json();
            const filteredRooms = rooms.filter((room) =>
              room.city.includes('서울'),
            );
            setListings(filteredRooms.slice(0, 10));
          } catch (error) {
            console.error('Error fetching listings:', error);
          }
        } else {
          console.error('Error fetching location or listings:', error);
        }
      }
    };

    fetchLocationAndListings();
  }, [dispatch]);

  return (
    <>
      <header>
        <Header />
      </header>
      <BodyContainer>
        <h2>현재 위치: {location || '알 수 없음'}</h2>
        <CardGrid listings={listings} />
      </BodyContainer>
    </>
  );
}

export default MainPage;
