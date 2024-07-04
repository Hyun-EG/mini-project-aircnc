import { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';
import CardGrid from '../Components/CardGrid.tsx';
import Map from '../Components/Map/Map.tsx';
import { RoomResponse } from '../assets/interfaces.ts';

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
  const { location, checkInDate, checkOutDate, guestCount, mode, coordinates } =
    useSelector((state: RootState) => state.search);
  const [listings, setListings] = useState<RoomResponse[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const loader = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchSearchByHeader = async () => {
      try {
        // 백엔드 작업중
        // const url = `http://ec2-52-79-187-32.ap-northeast-2.compute.amazonaws.com/api/rooms/city?capacity=${guestCount}&check_in=${checkInDate}&check_out=${checkOutDate}&city=${location}`;
        const url = `http://ec2-52-79-187-32.ap-northeast-2.compute.amazonaws.com/api/rooms/city`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch room data');
        }
        const data = await response.json();
        const roomData = data.body.room_response_list;
        setListings(roomData);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    const fetchSearchByMap = async () => {
      // try {
      const url = `http://ec2-52-79-187-32.ap-northeast-2.compute.amazonaws.com/api/rooms/map?capacity=${guestCount}&check_in=${checkInDate}&check_out=${checkOutDate}&top=${coordinates.top}&botton=${coordinates.bottom}&right=${coordinates.right}&left=${coordinates.left}`;
      console.log(url);
      //   const response = await fetch(url, {
      //     method: 'GET',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //   });
      //   if (!response.ok) {
      //     throw new Error('Failed to fetch room data');
      //   }
      //   const data = await response.json();
      //   const roomData = data.body.room_response_list;
      //   setListings(roomData);
      // } catch (error) {
      //   console.error('Error fetching listings:', error);
      // }
    };

    if (mode) {
      fetchSearchByHeader();
    } else {
      fetchSearchByMap();
    }
  }, [checkInDate, checkOutDate, guestCount, location, coordinates, mode]);

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
