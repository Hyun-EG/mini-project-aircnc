import { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';
import Header from '../Components/Header/Header.tsx';
import CardGrid from '../Components/CardGrid.tsx';
import Map from '../Components/Map/Map.tsx';
import { RoomData } from '../assets/interfaces.ts';

const SearchPageContainer = styled.div`
  display: flex;
  margin-top: 4vh;
`;

const CardGridContainer = styled.div`
  width: 60%;
  margin-top: 13vh;
  overflow-y: auto;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10vh;
  text-align: center;
`;

function SearchResultPage() {
  const { location } = useSelector((state: RootState) => state.search);
  const [listings, setListings] = useState<RoomData[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [error, setError] = useState<string | null>(null);
  const loader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('src/assets/room_data.json');
        const rooms: RoomData[] = await response.json();
        const filteredRooms = rooms.filter((room) =>
          room.city.includes(location),
        );
        setListings(filteredRooms);
      } catch (error) {
        setError('정보 불러오기를 실패했습니다.');
      }
    };

    if (location) {
      fetchListings();
    }
  }, [location]);

  const handleObserver = useCallback(
    (entities: IntersectionObserverEntry[]) => {
      const target = entities[0];
      if (target.isIntersecting) {
        setVisibleCount((prev) => (prev < listings.length ? prev + 10 : prev));
      }
    },
    [listings.length],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.1,
    });
    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [handleObserver]);

  return (
    <SearchPageContainer>
      <Header />
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <CardGridContainer>
        <CardGrid listings={listings.slice(0, visibleCount)} />
        <div ref={loader} />
      </CardGridContainer>
      <Map
        width="39.5%"
        height="100vh"
        listings={listings.slice(0, visibleCount)}
      />
    </SearchPageContainer>
  );
}

export default SearchResultPage;
