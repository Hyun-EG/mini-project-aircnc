// 검색 결과 페이지
// 헤더 + 좌측 리스트카드 + 우측 지도
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import CardGrid from '../Components/CardGrid.tsx';
import { RoomDetailData, RoomData } from '../assets/interfaces.ts';

const SearchPageContainer = styled.div`
  display: flex;
`;
const CardGridContainer = styled.div`
  width: 60%;
  height: 100px;
  background-color: red;
`;
const MapContainer = styled.div`
  width: 40%;
  height: 100px;
  background-color: blue;
`;

function SearchResultPage() {
  const [listings, setListings] = useState<RoomData[]>([]);

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
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchListings();
  }, []);

  return (
    <SearchPageContainer>
      <CardGridContainer>
        <CardGrid listings={listings} />
      </CardGridContainer>
      <MapContainer />
    </SearchPageContainer>
  );
}

export default SearchResultPage;
