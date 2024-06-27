// src/Components/Footer.tsx
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';
import addReservation from '../util/addReserveUtil.ts';
import addWishlist from '../util/addWishUtils.ts';

const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  border-top: 1px solid #eaeaea;
  padding: 10px 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
`;

const Button = styled.button`
  margin-right: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

const LikeButton = styled(Button)`
  background-color: white;
  color: #ff385c;
  border-color: #ff385c;
  border-radius: 5px;
`;

const ReserveButton = styled(Button)`
  background-color: #ff385c;
  color: white;
  border: none;
  border-radius: 5px;
`;

function DetailFooter() {
  const room = useSelector((state: RootState) => state.rooms.selectedRoom);
  if (!room) {
    return <h1>Loading</h1>;
  }

  const handleLike = () => {
    const roomID = room.id;
    const userID = 'testID1'; // UserID
    addWishlist({ roomID, userID } /* userID는 추후 로그인 데이터로 대체 */);
  };

  const handleReserve = () => {
    const userID = 'testID1'; // UserID
    const checkInDate = new Date('2024-06-27'); // 체크인 날짜
    const checkOutDate = new Date('2024-06-30'); // 체크아웃 날짜

    addReservation({
      room,
      userID,
      checkInDate,
      checkOutDate,
    });
  };

  return (
    <FooterContainer>
      <LikeButton onClick={handleLike}>좋아요</LikeButton>
      <ReserveButton onClick={handleReserve}>예약하기</ReserveButton>
    </FooterContainer>
  );
}

export default DetailFooter;
