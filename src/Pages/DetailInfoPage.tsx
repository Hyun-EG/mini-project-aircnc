import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  IconChevronLeft,
  IconCopy,
  IconPlus,
  IconMinus,
} from '@tabler/icons-react';
import { useEffect } from 'react';
import { RootState, AppDispatch } from '../redux/store.ts'; // AppDispatch 추가
import DetailCard from '../Components/DetailCard.tsx';
import DetailCalendar from '../Components/DetailCalendar.tsx';
import DetailFooter from '../Components/DetailFooter.tsx';
import DetailMap from '../Components/Map/DetailMap.tsx';
import { setGuestCount } from '../redux/slices/searchSlice.ts';
import formatNumber from '../util/formatNumber.ts';
import {
  GuestSelectContainer,
  GuestOptionCounter,
  GuestOptionLabel,
  GuestTotalCount,
} from '../Components/Header/Guest.tsx';
import Button from '../Components/Button.tsx';
import { fetchRoomDetails } from '../redux/slices/roomDetailSlice.ts';

const ContainerHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2rem 0 3rem;
`;

const ContainerHeaderTitle = styled.h2`
  font-size: 1.5rem;
`;

const InfoContainer = styled.div`
  display: flex;
  overflow: hidden;
  @media (max-width: 1300px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const RoomBookingDetails = styled.div`
  width: 90%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
  border: 1px solid #ccc;
  border-radius: 32px;
  box-sizing: border-box;
  @media (min-width: 1279px) {
    width: fit-content;
  }
`;

const BookingGuestContainer = styled(GuestSelectContainer)`
  position: relative;
  top: 0;
  left: 0;
  margin-top: -2rem;
  @media (min-width: 601px) {
    width: fit-content;
  }
`;

const BookingDetailsContent = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  gap: 0.5rem;
  font-size: 1.375rem;
  font-weight: ${(props) => props.theme.fontWeight.medium};
  text-align: right;
`;

const MapTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 3rem;
`;

const MapContainer = styled.div`
  width: 80%;
  margin: 0 10%;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
`;

const SeparationLine = styled.div`
  width: 100%;
  height: 0.1px;
  margin: 4rem 0;
  background-color: lightgrey;
`;

const DetailFooterArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 6rem;
`;

const DetailFooterTitle = styled.div`
  font-size: 3vh;
  margin-bottom: 2vh;
  color: #8e8b8b;
`;

const DetailFooterContent = styled.div`
  text-align: center;
  font-size: 2vh;
  line-height: 3.5vh;
  color: #ababab;
`;

export default function DetailInfoPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const room = useSelector((state: RootState) => state.rooms.room); // 변경된 부분: selectedRoom -> room

  const guestCount = useSelector((state: RootState) => state.search.guestCount);
  const checkInDate = useSelector(
    (state: RootState) => state.search.checkInDate,
  );
  const checkOutDate = useSelector(
    (state: RootState) => state.search.checkOutDate,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchRoomDetails(Number(id)));
    }
  }, [dispatch, id]);

  if (!room) {
    return <h1>loading...</h1>;
  }

  const incrementGuestCount = () => {
    dispatch(setGuestCount(guestCount + 1));
  };

  const decrementGuestCount = () => {
    if (guestCount === 0) return;
    dispatch(setGuestCount(guestCount - 1));
  };

  const copyUrlToClipboard = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        alert('주소복사 성공했습니다. 축하해요 ㅎㅎ');
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  };

  const calculateTotalPrice = () => {
    const pricePerNight = room.price; // 변경된 부분: selectedRoom -> room
    if (checkOutDate && checkInDate) {
      const nights = Math.round(
        (new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) /
          (1000 * 60 * 60 * 24),
      );
      const totalPrice = pricePerNight * nights;
      return totalPrice;
    }
    return room.price; // 변경된 부분: selectedRoom -> room
  };

  return (
    <>
      <ContainerHeader>
        <Button
          $size="medium"
          $shape="circle"
          $color="white"
          onClick={() => navigate(-1)}
        >
          <IconChevronLeft />
        </Button>
        <ContainerHeaderTitle>{room.name}</ContainerHeaderTitle>{' '}
        {/* 변경된 부분: selectedRoom -> room */}
        <Button
          $size="medium"
          $shape="circle"
          $color="white"
          onClick={copyUrlToClipboard}
        >
          <IconCopy />
        </Button>
      </ContainerHeader>
      <InfoContainer>
        <DetailCard />
        <RoomBookingDetails>
          <DetailCalendar />
          <BookingGuestContainer>
            <GuestOptionLabel>인원</GuestOptionLabel>
            <GuestOptionCounter>
              <Button
                $size="small"
                $shape="circle"
                $color="white"
                $border
                onClick={decrementGuestCount}
              >
                <IconMinus size={16} />
              </Button>
              <GuestTotalCount>{guestCount}</GuestTotalCount>
              <Button
                $size="small"
                $shape="circle"
                $color="white"
                $border
                onClick={incrementGuestCount}
              >
                <IconPlus size={16} />
              </Button>
            </GuestOptionCounter>
          </BookingGuestContainer>
          <BookingDetailsContent>
            <span>{`${formatNumber(room.price)}원 / 박`}</span>{' '}
            {/* 변경된 부분: selectedRoom -> room */}
          </BookingDetailsContent>
        </RoomBookingDetails>
      </InfoContainer>
      <SeparationLine />
      <MapContainer>
        <MapTitle>숙소 위치</MapTitle>
        <DetailMap width="100%" height="50vh" listing={room} />{' '}
        {/* 변경된 부분: selectedRoom -> room */}
      </MapContainer>
      <SeparationLine />
      <DetailFooterArea>
        <DetailFooterTitle>aircnc</DetailFooterTitle>
        <DetailFooterContent>
          (주) aircnc는 통신판매 중개자로서 통신판매의 당사자가 아니며 상품의
          예약, 이용 및 환불 등과 관련한 의무와 책임은 각 판매자에게 있습니다.
          <br />
          숙박업소는 법적으로 청소년 고용과 혼숙이 금지되어 있습니다. 따라서
          청소년 혼숙으로 인한 입실거부는 정당하며, 이에 대한 법적 제재는 이용
          당사자가 책임져야 합니다.
        </DetailFooterContent>
      </DetailFooterArea>
      <DetailFooter
        room={room}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        totalPrice={calculateTotalPrice()}
      />
    </>
  );
}

// import { useSelector, useDispatch } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import styled from 'styled-components';
// import {
//   IconChevronLeft,
//   IconCopy,
//   IconPlus,
//   IconMinus,
// } from '@tabler/icons-react';
// import { useEffect } from 'react';
// import { RootState, AppDispatch } from '../redux/store.ts';
// import DetailCard from '../Components/DetailCard.tsx';
// import DetailCalendar from '../Components/DetailCalendar.tsx';
// import DetailFooter from '../Components/DetailFooter.tsx';
// import DetailMap from '../Components/Map/DetailMap.tsx';
// import { setGuestCount } from '../redux/slices/searchSlice.ts';
// import formatNumber from '../util/formatNumber.ts';
// import {
//   GuestSelectContainer,
//   GuestOptionCounter,
//   GuestOptionLabel,
//   GuestTotalCount,
// } from '../Components/Header/Guest.tsx';
// import Button from '../Components/Button.tsx';
// import { fetchRoomDetails } from '../redux/slices/roomDetailSlice.ts';

// const ContainerHeader = styled.header`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin: 2rem 0 3rem;
// `;

// const ContainerHeaderTitle = styled.h2`
//   font-size: 1.5rem;
// `;

// const InfoContainer = styled.div`
//   display: flex;
//   overflow: hidden;
//   @media (max-width: 1300px) {
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//   }
// `;

// const RoomBookingDetails = styled.div`
//   width: 90%;
//   flex-grow: 1;
//   display: flex;
//   flex-direction: column;
//   padding: 0 2rem;
//   border: 1px solid #ccc;
//   border-radius: 32px;
//   box-sizing: border-box;
//   @media (min-width: 1279px) {
//     width: fit-content;
//   }
// `;

// const BookingGuestContainer = styled(GuestSelectContainer)`
//   position: relative;
//   top: 0;
//   left: 0;
//   margin-top: -2rem;
//   @media (min-width: 601px) {
//     width: fit-content;
//   }
// `;

// const BookingDetailsContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin: 1rem 0;
//   gap: 0.5rem;
//   font-size: 1.375rem;
//   font-weight: ${(props) => props.theme.fontWeight.medium};
//   text-align: right;
// `;

// const MapTitle = styled.h3`
//   font-size: 1.5rem;
//   margin-bottom: 3rem;
// `;

// const MapContainer = styled.div`
//   width: 80%;
//   margin: 0 10%;
//   border-radius: 10px;
//   overflow: hidden;
//   text-align: center;
// `;

// const SeparationLine = styled.div`
//   width: 100%;
//   height: 0.1px;
//   margin: 4rem 0;
//   background-color: lightgrey;
// `;

// const DetailFooterArea = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-bottom: 6rem;
// `;

// const DetailFooterTitle = styled.div`
//   font-size: 3vh;
//   margin-bottom: 2vh;
//   color: #8e8b8b;
// `;

// const DetailFooterContent = styled.div`
//   text-align: center;
//   font-size: 2vh;
//   line-height: 3.5vh;
//   color: #ababab;
// `;

// export default function DetailInfoPage() {
//   const { id } = useParams<{ id: string }>();
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const roomDetails = useSelector((state: RootState) => state.rooms.room);
//   console.log('roomDetails : ', roomDetails);
//   const guestCount = useSelector((state: RootState) => state.search.guestCount);
//   const checkInDate = useSelector(
//     (state: RootState) => state.search.checkInDate,
//   );
//   const checkOutDate = useSelector(
//     (state: RootState) => state.search.checkOutDate,
//   );

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchRoomDetails(Number(id)));
//     }
//   }, [dispatch, id]);

//   if (!roomDetails) {
//     return <h1>loading...</h1>;
//   }

//   const incrementGuestCount = () => {
//     dispatch(setGuestCount(guestCount + 1));
//   };

//   const decrementGuestCount = () => {
//     if (guestCount === 0) return;
//     dispatch(setGuestCount(guestCount - 1));
//   };

//   const copyUrlToClipboard = () => {
//     const currentUrl = window.location.href;
//     navigator.clipboard
//       .writeText(currentUrl)
//       .then(() => {
//         alert('주소복사 성공했습니다. 축하해요 ㅎㅎ');
//       })
//       .catch((err) => {
//         console.error('Failed to copy: ', err);
//       });
//   };

//   const calculateTotalPrice = () => {
//     const pricePerNight = roomDetails.price;
//     if (checkOutDate && checkInDate) {
//       const nights = Math.round(
//         (new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) /
//           (1000 * 60 * 60 * 24),
//       );
//       const totalPrice = pricePerNight * nights;
//       return totalPrice;
//     }
//     return roomDetails.price;
//   };

//   return (
//     <>
//       <ContainerHeader>
//         <Button
//           $size="medium"
//           $shape="circle"
//           $color="white"
//           onClick={() => navigate(-1)}
//         >
//           <IconChevronLeft />
//         </Button>
//         <ContainerHeaderTitle>{roomDetails.name}</ContainerHeaderTitle>
//         <Button
//           $size="medium"
//           $shape="circle"
//           $color="white"
//           onClick={copyUrlToClipboard}
//         >
//           <IconCopy />
//         </Button>
//       </ContainerHeader>
//       <InfoContainer>
//         <DetailCard />
//         <RoomBookingDetails>
//           <DetailCalendar />
//           <BookingGuestContainer>
//             <GuestOptionLabel>인원</GuestOptionLabel>
//             <GuestOptionCounter>
//               <Button
//                 $size="small"
//                 $shape="circle"
//                 $color="white"
//                 $border
//                 onClick={decrementGuestCount}
//               >
//                 <IconMinus size={16} />
//               </Button>
//               <GuestTotalCount>{guestCount}</GuestTotalCount>
//               <Button
//                 $size="small"
//                 $shape="circle"
//                 $color="white"
//                 $border
//                 onClick={incrementGuestCount}
//               >
//                 <IconPlus size={16} />
//               </Button>
//             </GuestOptionCounter>
//           </BookingGuestContainer>
//           <BookingDetailsContent>
//             <span>{`${formatNumber(roomDetails.price)}원 / 박`}</span>
//           </BookingDetailsContent>
//         </RoomBookingDetails>
//       </InfoContainer>
//       <SeparationLine />
//       <MapContainer>
//         <MapTitle>숙소 위치</MapTitle>
//         <DetailMap width="100%" height="50vh" listing={roomDetails} />
//       </MapContainer>
//       <SeparationLine />
//       <DetailFooterArea>
//         <DetailFooterTitle>aircnc</DetailFooterTitle>
//         <DetailFooterContent>
//           (주) aircnc는 통신판매 중개자로서 통신판매의 당사자가 아니며 상품의
//           예약, 이용 및 환불 등과 관련한 의무와 책임은 각 판매자에게 있습니다.
//           <br />
//           숙박업소는 법적으로 청소년 고용과 혼숙이 금지되어 있습니다. 따라서
//           청소년 혼숙으로 인한 입실거부는 정당하며, 이에 대한 법적 제재는 이용
//           당사자가 책임져야 합니다.
//         </DetailFooterContent>
//       </DetailFooterArea>
//       <DetailFooter
//         room={roomDetails}
//         checkInDate={checkInDate}
//         checkOutDate={checkOutDate}
//         totalPrice={calculateTotalPrice()}
//       />
//     </>
//   );
// }
