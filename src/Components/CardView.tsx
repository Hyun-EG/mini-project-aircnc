import styled from 'styled-components';
import { MockData } from '../assets/interfaces.ts';

const CardContainer = styled.div`
  width: 90%;
  margin: 1vh auto;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
const ImageContainer = styled.div`
  width: 100%;
  height: 30vh;
  overflow: hidden;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const TextContainer = styled.div`
  padding: 1vh;
`;
const Title = styled.h3`
  margin: 0.5vh 0;
  font-size: 2.5vh;
  color: #333;
`;
const Address = styled.p`
  margin: 0.5vh 0;
  font-size: 2vh;
  color: #666;
`;
const Info = styled.p`
  margin: 0.5vh 0;
  font-size: 2vh;
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
