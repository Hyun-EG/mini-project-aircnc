import { useState, useEffect } from 'react';
import styled from 'styled-components';
import CardGrid from '../Components/CardGrid.tsx';
import { RoomDetailData } from '../assets/interfaces.ts';
import Header from '../Components/Header/Header.tsx';
import {
  getCurrentPosition,
  getAddressFromCoordinates,
} from '../util/currentLocationUtil.ts';

const BodyContainer = styled.div`
  margin-top: 13vh;
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
        const response = await fetch('/room_data.json');
        const data: RoomDetailData[] = await response.json();
        setListings(data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchAddress();
    fetchListings();
  }, []);

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
