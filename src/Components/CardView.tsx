import styled from 'styled-components';
import { MockData } from '../assets/interfaces.ts';

const CardContainer = styled.div`
  max-width: 80vw;
  margin: 3vw auto;
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
  padding: 1vw;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-sizing: border-box;
  object-fit: cover;
`;
const TextContainer = styled.div`
  margin: 1.5vw 1.5vw;
`;
const Title = styled.h3`
  margin: 1vw 0;
  font-size: 3vw;
  color: #333;
`;
const Address = styled.p`
  margin: 1vw 0;
  font-size: 2vw;
  color: #666;
`;
const Info = styled.p`
  margin: 1vw 0;
  font-size: 2vw;
  font-weight: bold;
  color: #333;
`;

function CardView({ photo, name, address, rooms }: MockData) {
  return (
    <CardContainer>
      <ImageContainer>
        <Image src={photo} alt={name} />
      </ImageContainer>
      <TextContainer>
        <Title>{name}</Title>
        <Address>{address}</Address>
        <Info>{rooms}</Info>
      </TextContainer>
    </CardContainer>
  );
}

export default CardView;
