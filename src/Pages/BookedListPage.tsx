// 로그인이 되었을 때만 표시되도록 처리
import { styled } from 'styled-components';

const BookedListContainer = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 10vh;
`;

const BookedListBody = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 15vh;
`;

const BookedListTitle = styled.div`
  font-size: 4vh;
  font-weight: 400;
`;

const SeparationLine = styled.div`
  width: 100%;
  height: 0.1px;
  margin: 2rem 0;
  background-color: lightgrey;
`;

const ReserTitleContainer = styled.div`
  width: 100%;
  height: 7vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReserTitleRoom = styled.div`
  width: 40%;
  height: 4vh;
  margin-right: 1vh;
  padding-left: 2vh;
  border-right: 1px solid lightgrey;
  display: flex;
  align-items: center;
`;

const ReserTitleDate = styled.div`
  width: 20%;
  height: 4vh;
  border-right: 1px solid lightgrey;
  margin-right: 1vh;
  display: flex;
  align-items: center;
`;

const ReserTitleGuest = styled.div`
  width: 20%;
  height: 4vh;
  border-right: 1px solid lightgrey;
  margin-right: 1vh;
  display: flex;
  align-items: center;
`;

const ReserTitlePrice = styled.div`
  width: 20%;
  height: 4vh;
  display: flex;
  align-items: center;
`;

const ReserCotentContainer = styled.div`
  width: 100%;
  height: 7vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ReserContentRoom = styled.div`
  width: 40%;
  height: 4vh;
  margin-right: 1vh;
  padding-left: 2vh;
  display: flex;
  align-items: center;
`;

const ReserContentDate = styled.div`
  width: 20%;
  height: 4vh;
  margin-right: 1vh;
  display: flex;
  align-items: center;
`;

const ReserContentGuest = styled.div`
  width: 20%;
  height: 4vh;
  margin-right: 1vh;
  display: flex;
  align-items: center;
`;

const ReserContentPrice = styled.div`
  width: 20%;
  height: 4vh;
  display: flex;
  align-items: center;
`;

export default function BookedListPage() {
  return (
    <div>
      <BookedListContainer>
        <BookedListBody>
          <BookedListTitle>예약 목록</BookedListTitle>
        </BookedListBody>
        <SeparationLine />
        <ReserTitleContainer>
          <ReserTitleRoom>방 이름</ReserTitleRoom>
          <ReserTitleDate>날짜</ReserTitleDate>
          <ReserTitleGuest>인원</ReserTitleGuest>
          <ReserTitlePrice>가격</ReserTitlePrice>
        </ReserTitleContainer>
        <ReserCotentContainer>
          <ReserContentRoom>방 이름</ReserContentRoom>
          <ReserContentDate>날짜</ReserContentDate>
          <ReserContentGuest>인원</ReserContentGuest>
          <ReserContentPrice>가격</ReserContentPrice>
        </ReserCotentContainer>
      </BookedListContainer>
    </div>
  );
}
