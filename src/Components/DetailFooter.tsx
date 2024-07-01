// src/Components/Footer.tsx
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { RootState } from '../redux/store.ts';
import Button from './Button.tsx';
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
  gap: 1rem;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  z-index: 100; //네이버맵 컨트롤러가 더 위에 올라오길래 넣었당께
`;

function DetailFooter() {
  const room = useSelector((state: RootState) => state.rooms.selectedRoom);
  const checkInDate = useSelector(
    (state: RootState) => state.search.checkInDate,
  );
  const checkOutDate = useSelector(
    (state: RootState) => state.search.checkOutDate,
  );
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

    if (checkInDate !== null && checkOutDate !== null) {
      addReservation({
        room,
        userID,
        checkInDate,
        checkOutDate,
      });
    } else {
      alert('날짜 입력 형식이 잘못되었습니다!');
    }
  };

  return (
    <FooterContainer>
      <Button $size="small" $shape="circle" $color="white" onClick={handleLike}>
        {room ? <IconHeart color="red" /> : <IconHeartFilled color="red" />}
      </Button>
      <Button
        $size="medium"
        $shape="square"
        $color="primary"
        onClick={handleReserve}
      >
        예약하기
      </Button>
    </FooterContainer>
  );
}

export default DetailFooter;
