import { styled } from 'styled-components';

const DetailContainer = styled.div`
  width: 100%;
  height: 35vh;
  border: 1px solid lightgrey;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
`;

const DetailTitle = styled.div`
  width: 100%;
  height: 5vh;
  border-bottom: 1px solid lightgrey;
  background: #ff385c;
  color: #fff;
  border-radius: 20px 20px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.5vh;
`;

const DetailContentArea = styled.div`
  padding: 1vh 2vh;
  display: flex;
  justify-content: space-between;
`;

const CheckIn = styled.div`
  width: 50vh;
  height: 12vh;
  border: 1px solid lightgrey;
  border-radius: 20px;
  margin-right: 2vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CheckInTitle = styled.div`
  font-size: 3vh;
  font-weight: bold;
  padding-bottom: 1vh;
`;

const CheckInDate = styled.div`
  font-size: 2vh;
`;

const CheckOut = styled.div`
  width: 50vh;
  height: 12vh;
  border: 1px solid lightgrey;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CheckOutTitle = styled.div`
  font-size: 3vh;
  font-weight: bold;
  padding-bottom: 1vh;
`;

const CheckOutDate = styled.div`
  font-size: 2vh;
`;

const DetailContent = styled.div`
  width: 81.5vh;
  height: 14vh;
  padding: 0 0 0 21vh;
  border: 1px solid lightgrey;
  border-radius: 20px;
  display: flex;
  justify-content: space-between;
`;

const ReserImpormation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ImpormationText = styled.div`
  padding: 0.1vh;
  font-size: 2.5vh;
`;

const ReserPrice = styled.div`
  padding-right: 15vh;
  display: flex;
  align-items: center;
  font-size: 4vh;
  font-weight: bold;
`;

export default function ReservationDetail() {
  return (
    <DetailContainer>
      <DetailTitle>상세내역</DetailTitle>
      <DetailContentArea>
        <CheckIn>
          <CheckInTitle>Check In</CheckInTitle>
          <CheckInDate>체크인 날짜</CheckInDate>
        </CheckIn>
        <CheckOut>
          <CheckOutTitle>Check Out</CheckOutTitle>
          <CheckOutDate>체크아웃 날짜</CheckOutDate>
        </CheckOut>
      </DetailContentArea>
      <DetailContent>
        <ReserImpormation>
          <ImpormationText>룸 이름</ImpormationText>
          <ImpormationText>예약날짜</ImpormationText>
          <ImpormationText>인원수</ImpormationText>
        </ReserImpormation>
        <ReserPrice>200,000원</ReserPrice>
      </DetailContent>
    </DetailContainer>
  );
}
