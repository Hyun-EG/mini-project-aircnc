// 숙박업소 조회 페이지
// 헤더 / 바디 상단부에 사진(width 2/3 수준), 지도 width(1/3 수준), 사진-지도 하단부에 숙박업소 명 + 주소. 정보 하단부에 방 정보(슬라이드로 만들까?) / 푸터(고정)에 좌측 하단에 하트? 예약하기 버튼
import { useSelector } from 'react-redux';
import { RootState } from '../store/index.ts';

function DetailInfoPage() {
  const selectedRoom = useSelector(
    (state: RootState) => state.rooms.selectedRoom,
  );

  if (!selectedRoom) {
    return <h1>Loading</h1>;
  }

  return <div>DetailInfoPage {selectedRoom.name}</div>;
}

export default DetailInfoPage;
