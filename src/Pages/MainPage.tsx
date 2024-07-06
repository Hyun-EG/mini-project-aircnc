import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import CardGrid from '../Components/CardGrid.tsx';
import { RoomResponse } from '../assets/interfaces.ts';
import useGeolocation from '../util/currentLocationUtil.ts';
import { getRandomRooms } from '../api/request.ts';

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
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

function MainPage() {
  const [listings, setListings] = useState<RoomResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // 초기에는 true로 설정
  const [locationError, setLocationError] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const location = useGeolocation();

  useEffect(() => {
    const fetchCloseLists = async (map_x: number, map_y: number) => {
      try {
        const data = await getRandomRooms(map_x, map_y);
        const roomData = (data.body as any).room_response_list;

        if (roomData.length === 0) {
          setFetchError('주위에 예약 가능한 숙소가 없습니다.');
        } else {
          setListings(roomData);
          setFetchError(null);
        }
      } catch (error) {
        setFetchError('숙소 정보를 불러오는 데 실패했습니다.');
        console.error('Error fetching listings:', error);
      } finally {
        setLoading(false); // API 요청이 완료되면 loading 상태를 false로 변경
      }
    };

    if (location.loaded && !location.error) {
      fetchCloseLists(location.coordinates!.lng, location.coordinates!.lat);
      setLocationError(null);
    } else if (location.error) {
      setLocationError(location.error.message);
      setLoading(false); // 위치 정보를 가져오지 못할 경우도 loading 상태를 false로 변경
    }
  }, [location]);

  // 위치 정보를 확인하는 중일 때는 스피너를 표시
  if (loading) {
    return (
      <SpinnerContainer>
        <Spinner />
      </SpinnerContainer>
    );
  }

  // 위치 정보가 확인되었을 때는 리스트를 렌더링
  return (
    <div>
      {locationError && (
        <div>
          <SpinnerContainer>
            <Spinner />
          </SpinnerContainer>
          <p>
            현재 위치를 검색할 수 없습니다. 브라우저의 위치 권한을 허용해주세요.
          </p>
        </div>
      )}
      {fetchError && (
        <div>
          <p>{fetchError}</p>
        </div>
      )}
      <CardGrid listings={listings} />
    </div>
  );
}

export default MainPage;
