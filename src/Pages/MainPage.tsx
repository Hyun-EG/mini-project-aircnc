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
        console.error('Error getting coordinates:', error);
      }
    };

    const fetchLocation = async () => {
      try {
        const position = await getCurrentPosition();
        console.log(position);
        const address = await getAddressFromCoordinates(
          position.coords.latitude,
          position.coords.longitude,
        );
        console.log('Current Address:', address);
      } catch (error: any) {
        setLocationError(error.message);
        console.error('Error getting location:', error);
      }
    };

    const fetchListings = async () => {
      try {
        const response = await fetch('/room_data.json');
        if (!response.ok) {
          throw new Error('Failed to fetch room data');
        }
        const data: RoomDetailData[] = await response.json();
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchCoordinates();
    fetchLocation();
    fetchListings();
  }, []);

  return (
    <div>
      {locationError && (
        <div>
          <p>{locationError}</p>
          <button onClick={() => window.location.reload()}>
            위치 권한 재요청
          </button>
        </div>
      )}
      <CardGrid listings={listings} />
    </div>
  );
}

export default MainPage;
