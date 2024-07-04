// 로그인이 되었을 때만 표시되도록 처리
import { styled } from 'styled-components';
import ReserDetail from '../Components/ReservationDetail.tsx';

const BookedListContainer = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 13vh;
`;

const BookedListBody = styled.div`
  margin: 0 15vh;
`;

const BookedListTitle = styled.div`
  padding: 3vh;
  font-size: 3vh;
  font-weight: 400;
`;

const RoomReserArea = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RoomCardContainer = styled.div`
  width: 40%;
  margin-right: 5vh;
  background: grey;
`;

const ReserCardContainer = styled.div`
  width: 60%;
`;

export default function BookedListPage() {
  return (
    <div>
      <BookedListContainer>
        <BookedListBody>
          <BookedListTitle>예약 목록</BookedListTitle>
          <RoomReserArea>
            <RoomCardContainer>방 컨테이너</RoomCardContainer>
            <ReserCardContainer>
              <ReserDetail />
            </ReserCardContainer>
          </RoomReserArea>
        </BookedListBody>
      </BookedListContainer>
    </div>
  );
}
