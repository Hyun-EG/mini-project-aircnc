import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import CardGrid from '../Components/CardGrid.tsx';
import Header from '../Components/header/Header.tsx';
import { RoomData } from '../assets/interfaces.ts';

const SearchPageContainer = styled.div`
  display: flex;
`;

const CardGridContainer = styled.div`
  width: 60%;
  margin-top: 13vh;
`;

const MapContainer = styled.div`
  width: 40%;
`;

function SearchResultPage() {
  const { state: searchParams } = useLocation();
  const [listings, setListings] = useState<RoomData[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('src/assets/room_data.json');
        const rooms: RoomData[] = await response.json();
        const filteredRooms = rooms.filter(
          (room: RoomData) => room.city === searchParams.location,
        );
        setListings(filteredRooms);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    if (searchParams && searchParams.location) {
      fetchListings();
    } else {
      console.log('검색한 파라미터 내용이 없습니다.');
    }
  }, [searchParams]);

  return (
    <SearchPageContainer>
      <Header />
      <CardGridContainer>
        <CardGrid listings={listings} />
      </CardGridContainer>
      <MapContainer />
    </SearchPageContainer>
  );
}

export default SearchResultPage;
