import { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store.ts';
import { setCursorId } from '../redux/slices/searchSlice.ts';
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
  const {
    location,
    checkInDate,
    checkOutDate,
    guestCount,
    mode,
    coordinates,
    cursorId,
  } = useSelector((state: RootState) => state.search);
  const [listings, setListings] = useState<RoomResponse[]>([]);
  const loader = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  const formatDate = (isoDate: string | null) => {
    if (isoDate === null) {
      return;
    }
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fetchMoreListings = useCallback(async () => {
    try {
      let url;
      if (mode === 'city') {
        // http://ec2-52-79-187-32.ap-northeast-2.compute.amazonaws.com/
        // http://52.79.187.32:8080/
        url = `https://www.entj.site/api/rooms/city?capacity=${guestCount}&check_in=${formatDate(checkInDate)}&check_out=${formatDate(checkOutDate)}&city=${location}`;
      } else {
<<<<<<< HEAD
        url = `https://www.entj.site/api/rooms/map?capacity=${guestCount}&check_in=${formatDate(checkInDate)}&check_out=${formatDate(checkOutDate)}&top=${coordinates.top}&bottom=${coordinates.bottom}&right=${coordinates.right}&left=${coordinates.left}`;
=======
        url = `https://www.entj.site/rooms/map?capacity=${guestCount}&check_in=${formatDate(checkInDate)}&check_out=${formatDate(checkOutDate)}&top=${coordinates.top}&bottom=${coordinates.bottom}&right=${coordinates.right}&left=${coordinates.left}`;
>>>>>>> dev
      }

      if (cursorId) {
        url += `&cursor_id=${cursorId}`;
      }

      console.log(url);
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

      setListings((prevListings) => [...prevListings, ...roomData]);

      dispatch(setCursorId(roomData[roomData.length - 1].room_id));
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  }, [
    checkInDate,
    checkOutDate,
    guestCount,
    location,
    mode,
    coordinates,
    cursorId,
    dispatch,
  ]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && listings.length > 0) {
        fetchMoreListings();
      }
    },
    [fetchMoreListings, listings.length],
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

  useEffect(() => {
    const fetchData = async () => {
      setListings([]);
      try {
        let url;
        if (mode === 'city') {
          url = `https://www.entj.site/api/rooms/city?capacity=${guestCount}&check_in=${formatDate(checkInDate)}&check_out=${formatDate(checkOutDate)}&city=${location}`;
        } else {
          url = `https://www.entj.site/api/rooms/map?capacity=${guestCount}&check_in=${formatDate(checkInDate)}&check_out=${formatDate(checkOutDate)}&top=${coordinates.top}&bottom=${coordinates.bottom}&right=${coordinates.right}&left=${coordinates.left}`;
        }

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

        if (roomData.length > 0) {
          dispatch(setCursorId(roomData[roomData.length - 1].room_id));
        }
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    fetchData();
  }, [
    checkInDate,
    checkOutDate,
    guestCount,
    location,
    mode,
    coordinates,
    dispatch,
  ]);

  return (
    <SearchPageContainer>
      <CardGridContainer>
        <CardGrid listings={listings} />
        <CardGridWatcher ref={loader} />
      </CardGridContainer>
      <MapMargin />
      <Map width="39.5%" height="95vh" listings={listings} />
    </SearchPageContainer>
  );
}

export default SearchResultPage;
