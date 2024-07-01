import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { RootState } from '../redux/store.ts';
import Header from '../Components/Header/Header.tsx';
import DetailCard from '../Components/DetailCard.tsx';
import DetailCalendar from '../Components/DetailCalendar.tsx';
import DetailFooter from '../Components/DetailFooter.tsx';
import DetailMap from '../Components/Map/DetailMap.tsx';
import { setGuestCount } from '../redux/slices/searchSlice.ts';
import backBtn from '../assets/images/backbtn.svg';
import shareBtn from '../assets/images/sharebtn.svg';
import formatNumber from '../util/formatNumber.ts';

const BodyContainer = styled.div`
  margin: 17vh 20vh;
  padding: 3vh;
`;

const ContainerHeader = styled.div`
  width: 100%;
  height: 3vh;
  display: flex;
  justify-content: space-between;
`;

const BackBtn = styled.img`
  width: 4vh;
  height: 4vh;
  cursor: pointer;
`;

const ContainerHeaderTitle = styled.div`
  font-size: 2vw;
`;

const ShareBtn = styled.img`
  width: 4vh;
  height: 4vh;
  cursor: pointer;
`;

const InfoContainer = styled.div`
  width: 100%;
  margin-top: 10vh;
  overflow: hidden;
  display: flex;

  @media (max-width: 1300px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const RoomBookingDetails = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
`;

const BookingDetailsContent = styled.div`
  width: 100%;
  font-size: 2.5vh;
  font-weight: bold;
  margin-top: 5vh;
`;

const AddSubGuestBtn = styled.button`
  width: 4vh;
  height: 4vh;
  margin-left: 2vh;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  font-size: 3vh;
  font-weight: bold;
  color: #fff;
  background: #ff385c;
`;

const MapTitle = styled.div`
  font-size: 3vh;
  margin-bottom: 2.5vh;
`;

const MapContainer = styled.div`
  width: 80%;
  margin: 0 10%;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  font-size: 3vh;
  font-weight: bold;
`;

const SeparationLine = styled.div`
  width: 100%;
  height: 0.1px;
  margin: 6vh 0 5vh 0;
  background-color: lightgrey;
`;

const DetailFooterArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const DetailFooterTitle = styled.div`
  font-size: 3vh;
  margin-bottom: 2vh;
  color: #8e8b8b;
`;

const DetailFooterContent = styled.div`
  font-size: 2vh;
  line-height: 3.5vh;
  color: #ababab;
`;

function DetailInfoPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedRoom = useSelector(
    (state: RootState) => state.rooms.selectedRoom,
  );
  const guestCount = useSelector((state: RootState) => state.search.guestCount);
  const checkInDate = useSelector(
    (state: RootState) => state.search.checkInDate,
  );
  const checkOutDate = useSelector(
    (state: RootState) => state.search.checkOutDate,
  );
  if (!selectedRoom) {
    return <h1>Loading...</h1>;
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
    const pricePerNight = selectedRoom.price;
    if (checkOutDate && checkInDate) {
      const nights =
        (checkOutDate.getTime() - checkInDate.getTime()) /
        (1000 * 60 * 60 * 24);
      const totalPrice = pricePerNight * nights;
      return totalPrice;
    }
    return selectedRoom.price;
  };

  return (
    <>
      <Header />
      <BodyContainer>
        <ContainerHeader>
          <BackBtn onClick={() => navigate(-1)} src={backBtn} />
          <ContainerHeaderTitle>{selectedRoom.name}</ContainerHeaderTitle>
          <ShareBtn onClick={copyUrlToClipboard} src={shareBtn} />
        </ContainerHeader>
        <InfoContainer>
          <DetailCard />
          <RoomBookingDetails>
            <DetailCalendar />
            <BookingDetailsContent>
              <div>{`Price: ${formatNumber(selectedRoom.price)} KRW / day`}</div>
              {`Personnel: ${guestCount}`}
              <AddSubGuestBtn onClick={incrementGuestCount}>+</AddSubGuestBtn>
              <AddSubGuestBtn onClick={decrementGuestCount}>-</AddSubGuestBtn>
              <div>{`Total Price: ${formatNumber(calculateTotalPrice()) !== formatNumber(selectedRoom.price) ? `${formatNumber(calculateTotalPrice())} KRW` : `${formatNumber(selectedRoom.price)} KRW / day`}`}</div>
            </BookingDetailsContent>
          </RoomBookingDetails>
        </InfoContainer>
        <SeparationLine />
        <MapContainer>
          <MapTitle>숙소 위치</MapTitle>
          <DetailMap width="100%" height="50vh" listing={selectedRoom} />
        </MapContainer>
        <SeparationLine />
        <DetailFooterArea>
          <DetailFooterTitle>aircnc</DetailFooterTitle>
          <DetailFooterContent>
            (주) aircnc는 통신판매 중개자로서 통신판매의 당사자가 아니며 상품의
            예약, 이용 및 환불 등과 관련한 의무와 책임은 각 판매자에게 있습니다.
            숙박업소는 법적으로 청소년 고용과 혼숙이 금지되어 있습니다. 따라서
            청소년 혼숙으로 인한 입실거부는 정당하며, 이에 대한 법적 제재는 이용
            당사자가 책임져야 합니다.
          </DetailFooterContent>
        </DetailFooterArea>
      </BodyContainer>
      <DetailFooter />
    </>
  );
}

export default DetailInfoPage;
