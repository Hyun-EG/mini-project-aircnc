import { useState, useEffect, useRef, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store.ts';
import { setCursorId, setMode } from '../redux/slices/searchSlice.ts';
import CardGrid from '../Components/CardGrid.tsx';
import Map, { MapInstance } from '../Components/Map/Map.tsx';
import { RoomResponse } from '../assets/interfaces.ts';
import { useRoomSearch } from '../hooks/room.tsx';
import SkeletonGrid, { SkeletonObject } from '../Components/SkeletonGrid.tsx';

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

const SkeletonMap = styled(SkeletonObject)`
  ${MapInstance}
  width: 39.5%;
  height: 95vh;
`;

const NoListingsMessage = styled.div`
  text-align: center;
  font-size: 1.5rem;
  color: red;
  margin: 2rem 0;
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid #3f51b5;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${rotate} 1s linear infinite;
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
  const [stopFetching, setStopFetching] = useState<boolean>(false);
  const loader = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const { mutateAsync: roomSearch, isPending, isError } = useRoomSearch();

  const formatDate = (isoDate: string | null) => {
    if (isoDate === null) {
      return '';
    }
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fetchData = useCallback(async () => {
    setListings([]);
    try {
      if (!checkInDate || !checkOutDate || !location) {
        return;
      }

      const response = await roomSearch({
        mode,
        queries: {
          capacity: guestCount,
          check_in: formatDate(checkInDate),
          check_out: formatDate(checkOutDate),
          city: location,
          cursor_id: null,
          ...coordinates,
        },
      });

      const roomData = response.body.room_response_list;
      setStopFetching(response.body.last);
      setListings(roomData);
      if (roomData.length > 0) {
        dispatch(setCursorId(roomData[roomData.length - 1].room_id));
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  }, [
    checkInDate,
    checkOutDate,
    location,
    coordinates,
    guestCount,
    coordinates,
    mode,
    dispatch,
  ]);

  const fetchMoreListings = useCallback(async () => {
    try {
      if (stopFetching) {
        return;
      }

      if (!checkInDate || !checkOutDate || !location || !cursorId) {
        return;
      }

      const response = await roomSearch({
        mode,
        queries: {
          capacity: guestCount,
          check_in: formatDate(checkInDate),
          check_out: formatDate(checkOutDate),
          city: location,
          cursor_id: cursorId,
          ...coordinates,
        },
      });

      const roomData = response.body.room_response_list;
      setStopFetching(response.body.last);
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

  const handleSearchClick = useCallback(() => {
    dispatch(setMode('map'));
    fetchData();
  }, [fetchData]);

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
    fetchData();
  }, [checkInDate, checkOutDate, guestCount, location, mode, dispatch]);

  if (isPending && !cursorId) {
    return (
      <SearchPageContainer>
        <CardGridContainer>
          <SkeletonGrid />
        </CardGridContainer>
        <MapMargin />
        <SkeletonMap />
      </SearchPageContainer>
    );
  }

  if (isError) {
    return <h1>Error!</h1>;
  }

  return (
    <SearchPageContainer>
      <CardGridContainer>
        {!listings.length ? (
          <NoListingsMessage>
            표시된 맵에 해당하는 숙소가 없습니다. 다시 검색 해주세요.
          </NoListingsMessage>
        ) : (
          <>
            <CardGrid listings={listings} />
            <CardGridWatcher ref={loader} />
            {isPending && (
              <SpinnerContainer>
                <Spinner />
              </SpinnerContainer>
            )}
          </>
        )}
      </CardGridContainer>
      <MapMargin />
      <Map
        width="39.5%"
        height="95vh"
        listings={listings}
        handleSearchClick={handleSearchClick}
      />
    </SearchPageContainer>
  );
}

export default SearchResultPage;
