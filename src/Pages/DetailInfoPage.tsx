// 숙박업소 조회 페이지
// 헤더
// 바디[숙소 정보 / 캘린더 + 지도]
// 숙소 정보(숙소명 + 사진 + 정보 (카드 가져와서 붙일까..? 귀찮은데,,?ㅠ) / 캘린더 + 클릭하면 체크인/아웃 날짜 체크하고 예상 숙박 금액 표시)
// 푸터..? 예약하기 버튼, 클릭했을 때 유효성 검사 한번 더 해서 불가능하면 빨간 글씨로 바꾸기
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../store/index.ts';
import Header from '../Components/Header/Header.tsx';
import DetailCard from '../Components/DetailCard.tsx';
import DetailCalendar from '../Components/DetailCalendar.tsx';

// 헤더 아래로 바디 두려고,,
const BodyContainer = styled.div`
  margin-top: 13vh;
  padding: 20px;
`;

// 숙소정보 + 캘린더 넣자
const InfoContainer = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
`;

const MapContainer = styled.div`
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
`;

function DetailInfoPage() {
  const selectedRoom = useSelector(
    (state: RootState) => state.rooms.selectedRoom,
  );

  if (!selectedRoom) {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <Header />
      <BodyContainer>
        <h1>{selectedRoom.name}</h1>
        <InfoContainer>
          <DetailCard />
          <DetailCalendar />
        </InfoContainer>
        <MapContainer>
          {/* 지도 넣기 */}
          숙소 위치
        </MapContainer>
      </BodyContainer>
    </>
  );
}

export default DetailInfoPage;
