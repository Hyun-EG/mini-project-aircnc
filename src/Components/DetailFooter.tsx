import styled from 'styled-components';
import { IconHeart } from '@tabler/icons-react'; // IconHeartFilled?
import Button from './Button.tsx';
// import addReservation from '../util/addReserveUtil.ts';
// import addWishlist from '../util/addWishUtils.ts';
import { RoomResponse } from '../assets/interfaces.ts';
import formatNumber from '../util/formatNumber.ts';
import { postWish, postPayment } from '../api/request.ts';

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
  z-index: 100;
`;

const FooterPrice = styled.span`
  font-size: 1.25rem;
`;

interface DetailFooterProps {
  totalPrice: number | null;
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

  const handleLike = async () => {
    await postWish(room.room_id);
  };

  const handleReserve = async () => {
    // 이 부분 에러 핸들링 필요
    if (!totalPrice) {
      return;
    }
    if (checkInDate !== null && checkOutDate !== null) {
      const parsedCheckInDate = new Date(checkInDate);
      const parsedCheckOutDate = new Date(checkOutDate);

      if (
        !Number.isNaN(parsedCheckInDate.getTime()) &&
        !Number.isNaN(parsedCheckOutDate.getTime())
      ) {
        const paymentData = {
          price: totalPrice,
          capacity: room.max_capacity,
          check_in: checkInDate,
          check_out: checkOutDate,
        };
        await postPayment(room.room_id, paymentData);
      } else {
        alert('유효한 날짜를 입력해 주세요!');
      }
    } else {
      alert('날짜를 입력해 주세요!');
    }
  };

  return (
    <FooterContainer>
      <FooterPrice>
        {totalPrice
          ? `총 가격: ${formatNumber(totalPrice)}원`
          : '가격을 계산할 수 없습니다.'}
      </FooterPrice>
      <Button $size="small" $shape="circle" $color="white" onClick={handleLike}>
        <IconHeart color="red" />
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
