import { useState, useEffect } from 'react';
import CardGrid from '../Components/CardGrid.tsx';
import { RoomDetailData } from '../assets/interfaces.ts';
import {
  getCurrentPosition,
  getAddressFromCoordinates,
} from '../util/currentLocationUtil.ts';

function MainPage() {
  const [listings, setListings] = useState<RoomDetailData[]>([]);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const position = await getCurrentPosition();
        console.log('coordinates = ', position);
      } catch (error: any) {
        setLocationError(error.message);
        console.error('Error getting coordinates');
      }
    };
    fetchCoordinates();

    const fetchLocation = async () => {
      try {
        const position = await getCurrentPosition();
        console.log(position);
        const address = await getAddressFromCoordinates(
          position.latitude,
          position.longitude,
        );
        console.log('Current Address:', address);
      } catch (error: any) {
        setLocationError(error.message);
        console.error('Error getting location:', error);
      }
    };

    const fetchListings = async () => {
      try {
        const response = await fetch('/public/room_data.json');
        const data: RoomDetailData[] = await response.json();
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchLocation();
    fetchListings();
  }, []);

  return (
    <div>
      {locationError && <p>{locationError}</p>}
      <CardGrid listings={listings} />
    </div>
  );
}

export default MainPage;
