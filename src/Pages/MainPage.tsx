import { useState, useEffect } from 'react';
import CardGrid from '../Components/CardGrid.tsx';
import { RoomDetailData } from '../assets/interfaces.ts';
import {
  getCurrentPosition,
  getAddressFromCoordinates,
} from '../util/currentLocationUtil.ts';

function MainPage() {
  const [listings, setListings] = useState<RoomDetailData[]>([]);

  useEffect(() => {
    // Fetch current position and address
    const fetchAddress = async () => {
      try {
        const position = await getCurrentPosition();
        const address = await getAddressFromCoordinates(
          position.latitude,
          position.longitude,
        );
        console.log('Current Address:', address);
      } catch (error) {
        console.error('Error getting address:', error);
      }
    };

    const fetchListings = async () => {
      try {
        // const testRes = await fetch(
        //   'http://54.180.158.55:8080/api/auth/login',
        //   {
        //     method: 'POST',
        //     headers: {
        //       Origin: 'http://localhost:5173/',
        //       'Access-Control-Request-Method': 'POST',
        //       'Access-Control-Request-Headers': 'content-type',
        //     },
        //     body: JSON.stringify({
        //       email: 'user1@gmail.com',
        //       password: '1234',
        //     }),
        //   },
        // );
        // const testEmail = await fetch(
        //   'http://54.180.158.55:8080/api/auth/email/user1@gmail.com',
        //   {
        //     method: 'GET',
        //   },
        // );

        // const testResBody = await testRes.json();
        // const testEmailBody = await testEmail.json();

        // console.log(testEmailBody);
        // console.log(testResBody);

        // const testData = await testRes.json();
        // console.log(testData);

        // const response = await fetch(
        //   'http://54.180.158.55:8080/api/rooms/randoms',
        //   {
        //     method: 'GET',
        //     headers: {
        //       'Content-Type': 'application/json',
        //       Origin: 'http://localhost:5173/',
        //       'Access-Control-Request-Method': 'POST',
        //       'Access-Control-Request-Headers': 'content-type',
        //     },
        //   },
        // );

        const response = await fetch('/src/assets/room_data.json');

        const data: RoomDetailData[] = await response.json();
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    // fetchAddress();
    fetchListings();
  }, []);

  return <CardGrid listings={listings} />;
}

export default MainPage;
