import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RoomData } from '../assets/interfaces.ts';
import { selectRoom } from '../redux/slices/roomDetailSlice.ts';

const CardContainer = styled.div`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
const ImageContainer = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 100%;
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
  border-radius: 10px;
  box-sizing: border-box;
  object-fit: cover;
`;
const TextContainer = styled.div`
  margin: 10px 10px;
`;
const Title = styled.h3`
  margin: 10px 0;
  font-size: 20px;
  color: #333;
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

function Card(props: RoomData) {
  const { id, image_url, name, address, price } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // id에 따라 페이지 이동..
  const handleClick = () => {
    dispatch(selectRoom(props));
    navigate(`/detail/${id}`);
  };
  // image_url이 카멜케이스가 아니라고 난리네,,ㅠㅠ 백엔드 보이..
  return (
    <CardContainer onClick={handleClick}>
      <ImageContainer>
        <Image src={image_url} alt={name} />
      </ImageContainer>
      <TextContainer>
        <Title>{name}</Title>
        <Address>{address}</Address>
        <Info>{price}원/박</Info>
      </TextContainer>
    </CardContainer>
  );
}

export default Card;
