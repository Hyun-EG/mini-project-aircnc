import { useState, useEffect } from 'react';
import styled from 'styled-components';
import CardGrid from '../Components/CardGrid.tsx';
import { RoomDetailData } from '../assets/interfaces.ts';
import {
  getCurrentPosition,
  getAddressFromCoordinates,
} from '../util/currentLocationUtil.ts';

const BodyContainer = styled.main`
  padding: 20px;
`;

function MainPage() {
  const [listings, setListings] = useState<RoomDetailData[]>([]);

  useEffect(() => {
    // alert(
    //   '백엔드 작업이 너무 느려서 API를 연결하지 못했습니다. \n완성을 도대체 언제 하려고 그러는걸까요..? \n호기롭게 기능은 다 만들었지만 고도화중이라고 했는데;;; 너무 고도화하네..',
    // );

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

        // console.log(testRes.headers.values);

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

  return (
    <BodyContainer>
      <CardGrid listings={listings} />
    </BodyContainer>
  );
}

export default MainPage;
