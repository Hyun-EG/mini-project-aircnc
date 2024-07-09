import { useMemo } from 'react';
// import styled, { keyframes } from 'styled-components';
import CardGrid from '../Components/CardGrid.tsx';
import { RoomResponse } from '../assets/interfaces.ts';
import useGeolocation from '../util/currentLocationUtil.ts';
import { useRandomRooms } from '../hooks/room.tsx';
import SkeletonGrid from '../Components/SkeletonGrid.tsx';

// const SpinnerContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
// `;

// const rotate = keyframes`
//   from {
//     transform: rotate(0deg);
//   }
//   to {
//     transform: rotate(360deg);
//   }
// `;

// const Spinner = styled.div`
//   border: 4px solid rgba(0, 0, 0, 0.1);
//   border-top: 4px solid #3f51b5;
//   border-radius: 50%;
//   width: 50px;
//   height: 50px;
//   animation: ${rotate} 1s linear infinite;
// `;

function MainPage() {
  const location = useGeolocation();

  const lat = useMemo(() => location.coordinates!.lat, [location.coordinates]);
  const lng = useMemo(() => location.coordinates!.lng, [location.coordinates]);

  const { data, isLoading, isError } = useRandomRooms({
    map_x: lng,
    map_y: lat,
    radius: 4.5,
  });

  if (!location.loaded) {
    return <SkeletonGrid />;
  }

  // 위치 정보를 확인하는 중일 때는 스피너를 표시
  if (isLoading) {
    return <SkeletonGrid />;
  }

  if (isError) {
    return (
      <div>
        <p>숙소 정보를 불러오는 데 실패했습니다.</p>
      </div>
    );
  }

  // 위치 정보가 확인되었을 때는 리스트를 렌더링
  return data ? (
    <CardGrid listings={data as RoomResponse[]} />
  ) : (
    <div>
      <p>주위에 예약 가능한 숙소가 없습니다.</p>
    </div>
  );
}

export default MainPage;
