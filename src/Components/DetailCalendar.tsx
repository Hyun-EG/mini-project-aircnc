import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Calendar from 'react-calendar';
import { RootState } from '../store/index.ts';

const CardContainer = styled.div`
  width: 80%;
  padding: 10px;
  border-radius: 10px;
  overflow: hidden;
`;
const CalendarContainer = styled.div`
  width: 100%;
  height: 0;
  padding: 10px;
  padding-bottom: 100%;
  border-radius: 10px;
  background-color: #e9e9e9;
  overflow: hidden;
  position: relative;
`;

const TextContainer = styled.div`
  margin: 10px 10px;
`;

const Address = styled.p`
  margin: 10px 0;
  font-size: 15px;
  color: #666;
`;
const Info = styled.p`
  margin: 10px 0;
  font-size: 15px;
  font-weight: bold;
  color: #333;
`;

function DetailCalendar() {
  const selectedRoom = useSelector(
    (state: RootState) => state.rooms.selectedRoom,
  );
  if (!selectedRoom) {
    return <h1>Loading</h1>;
  }
  // image_url이 카멜케이스가 아니라고 난리네,,ㅠㅠ 백엔드 보이..
  return (
    <CardContainer>
      <CalendarContainer>calendar들어갈 자리입니다~</CalendarContainer>
      {/* 캘린더에 클릭한 정보(검색한 정보가 있으면 표시) */}
      <TextContainer>
        <Info>{selectedRoom.description}</Info>
        <Address>{selectedRoom.address}</Address>
      </TextContainer>
    </CardContainer>
  );
}

export default DetailCalendar;
