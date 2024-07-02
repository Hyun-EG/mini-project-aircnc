import { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';
import CardGrid from '../Components/CardGrid.tsx';
import Map from '../Components/Map/Map.tsx';
import { RoomDetailData } from '../assets/interfaces.ts';

const SearchPageContainer = styled.div`
  display: flex;
  @media (min-width: 481px) {
    margin: 0 -1rem;
  }
`;

const CardGridContainer = styled.section`
  flex-basis: 60%;
  flex-grow: 1;
`;

const CardGridWatcher = styled.div`
  height: 1px;
`;

const MapMargin = styled.div`
  flex-basis: 40%;
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
      <CardGridContainer>
        <CardGrid listings={listings.slice(0, visibleCount)} />
        <CardGridWatcher ref={loader} />
      </CardGridContainer>
      <MapMargin />
      <Map
        width="39.5%"
        height="95vh"
        listings={listings.slice(0, visibleCount)}
      />
    </SearchPageContainer>
  );
}

export default SearchResultPage;
