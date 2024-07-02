import { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';
import Header from '../Components/Header/Header.tsx';
import CardGrid from '../Components/CardGrid.tsx';
import Map from '../Components/Map/Map.tsx';
import { RoomDetailData } from '../assets/interfaces.ts';

const SearchPageContainer = styled.div`
  display: flex;
  margin-top: 10vh;
`;

const CardGridContainer = styled.div`
  width: 60%;
  margin-top: 13vh;
  overflow: auto;
`;

function SearchResultPage() {
  const { location } = useSelector((state: RootState) => state.search);
  const [listings, setListings] = useState<RoomDetailData[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch('src/assets/room_data.json');
        const rooms: RoomDetailData[] = await response.json();
        const filteredRooms = rooms.filter((room) =>
          room.city.includes(location),
        );
        setListings(filteredRooms);
      } catch (error) {
        console.error('Error fetching listings:', error);
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
    [listings],
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
