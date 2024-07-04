import styled from 'styled-components';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import Button from './Button.tsx';
import addReservation from '../util/addReserveUtil.ts';
import addWishlist from '../util/addWishUtils.ts';
import { RoomResponse } from '../assets/interfaces.ts';
import formatNumber from '../util/formatNumber.ts';

const FooterContainer = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  border-top: 1px solid #eaeaea;
  padding: 10px 1rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  z-index: 100; // 네이버맵 컨트롤러가 더 위에 올라오길래 넣었당께
`;

const FooterPrice = styled.span`
  font-size: 1.25rem;
`;

interface DetailFooterProps {
  totalPrice: number;
  room: RoomResponse;
  checkInDate: string | null;
  checkOutDate: string | null;
}

function DetailFooter({
  totalPrice,
  room,
  checkInDate,
  checkOutDate,
}: DetailFooterProps) {
  if (!room) {
    return <h1>Loading</h1>;
  }

  const handleLike = () => {
    const roomID = room.room_id;
    const userID = 'testID1'; // UserID
    addWishlist({ roomID, userID } /* userID는 추후 로그인 데이터로 대체 */);
  };

  const handleReserve = () => {
    const userID = 'testID1'; // UserID

    if (checkInDate !== null && checkOutDate !== null) {
      const parsedCheckInDate = new Date(checkInDate);
      const parsedCheckOutDate = new Date(checkOutDate);

      if (
        !Number.isNaN(parsedCheckInDate.getTime()) &&
        !Number.isNaN(parsedCheckOutDate.getTime())
      ) {
        addReservation({
          room,
          userID,
          checkInDate: parsedCheckInDate,
          checkOutDate: parsedCheckOutDate,
        });
      } else {
        alert('유효한 날짜를 입력해 주세요!');
      }
    } else {
      alert('날짜를 입력해 주세요!');
    }
  };

  return (
    <FooterContainer>
      <FooterPrice>{`총 가격: ${formatNumber(totalPrice)}원`}</FooterPrice>
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
