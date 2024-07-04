import { useState, useEffect } from 'react';
import CardGrid from '../Components/CardGrid.tsx';
import { RoomDetailData, RoomResponse } from '../assets/interfaces.ts';
import useGeolocation from '../util/currentLocationUtil.ts';

// 서울시청 좌표 37.566611, 126.978361
const DEFAULT_COORDINATES = {
  lat: 37.566611,
  lng: 126.978361,
};

function MainPage() {
  const [listings, setListings] = useState<RoomDetailData[]>([]); // 여기를 CardResponse로 고쳐야해
  const [locationError, setLocationError] = useState<string | null>(null);
  const location = useGeolocation();

  useEffect(() => {
    const fetchCloseLists = async (map_x: number, map_y: number) => {
      try {
        const radius = 0.5;
        const url = `http://ec2-52-79-187-32.ap-northeast-2.compute.amazonaws.com/api/rooms/randoms?map_x=${map_x}&map_y=${map_y}&radius=${radius}`;
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
        setListings(roomData);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };

    if (location.loaded && !location.error) {
      fetchCloseLists(location.coordinates!.lng, location.coordinates!.lat);
      setLocationError(null); // 위치 정보가 불러와지면 오류 메시지 제거
    } else if (location.error) {
      setLocationError(location.error.message);
      fetchCloseLists(DEFAULT_COORDINATES.lng, DEFAULT_COORDINATES.lat); // 기본 좌표로 데이터 가져오기
    }
  }, [location]);

  return (
    <div>
      {locationError && (
        <div>
          <p>
            현재 위치를 검색할 수 없습니다. 브라우저의 위치 권한을 허용해주세요.
          </p>
        </div>
      )}
      <CardGrid listings={listings} />
    </div>
  );
}

export default MainPage;
