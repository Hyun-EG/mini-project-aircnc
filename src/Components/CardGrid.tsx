import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Card from './Card.tsx';
import { RoomDetailData } from '../assets/interfaces.ts';
// import { RootState } from '../redux/store.ts';
import { setLocation } from '../redux/slices/searchSlice.ts';
import {
  getCurrentPosition,
  getAddressFromCoordinates,
} from '../util/currentLocationUtil.ts';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
  margin: 0;
  width: 100%;
`;

export default function CardGrid() {
  const [listings, setListings] = useState<RoomDetailData[]>([]);
  const dispatch = useDispatch();
  // const location = useSelector((state: RootState) => state.search.location);

  useEffect(() => {
    const fetchLocationAndListings = async () => {
      try {
        const { latitude, longitude } = await getCurrentPosition();
        const address = await getAddressFromCoordinates(latitude, longitude);
        dispatch(setLocation(address));

        const response = await fetch('src/assets/room_data.json');
        const rooms: RoomDetailData[] = await response.json();
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
            const rooms: RoomDetailData[] = await response.json();
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
    // props spreading is forbidden,, eslint설정 진짜 중요하다..;
    <GridContainer>
      {listings.map((listing) => (
        <Card key={listing.id} {...listing} />
      ))}
    </GridContainer>
  );
}
