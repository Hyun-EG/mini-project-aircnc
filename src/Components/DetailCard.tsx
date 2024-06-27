import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store.ts';

const CardContainer = styled.div`
  width: 60%;
  padding: 10px;
  margin-right: 20vh;
  border-radius: 10px;
  overflow: hidden;
`;
const ImageContainer = styled.div`
  width: 100%;
  padding-bottom: 80%;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
`;
const Image = styled.img`
  position: absolute;
  padding: 10px;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  box-sizing: border-box;
  object-fit: cover;
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

function DetailCard() {
  const selectedRoom = useSelector(
    (state: RootState) => state.rooms.selectedRoom,
  );
  if (!selectedRoom) {
    return <h1>Loading</h1>;
  }
  // image_url이 카멜케이스가 아니라고 난리네,,ㅠㅠ 백엔드 보이..
  return (
    <CardContainer>
      <ImageContainer>
        <Image src={selectedRoom.image_url} alt={selectedRoom.name} />
      </ImageContainer>
      <TextContainer>
        <Info>{selectedRoom.description}</Info>
        <Address>{selectedRoom.address}</Address>
      </TextContainer>
    </CardContainer>
  );
}

export default DetailCard;
