import styled from 'styled-components';
import { RoomResponse } from '../assets/interfaces.ts';

export const CardContainer = styled.div`
  width: 60%;
  padding: 10px;
  margin-right: 4vh;
  overflow: hidden;
`;
export const ImageContainer = styled.div`
  width: 100%;
  height: 50vh;
  overflow: hidden;
  position: relative;
`;
export const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-sizing: border-box;
  object-fit: cover;
`;

const RoomTitle = styled.div`
  font-size: 3vh;
`;

export const TextContainer = styled.div`
  margin: 3vh 1vh 1vh 1vh;
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

function DetailCard({
  name: roomName,
  image_url: imageURL,
  description,
  address,
}: Pick<RoomResponse, 'name' | 'image_url' | 'description' | 'address'>) {
  return (
    <CardContainer>
      <ImageContainer>
        <Image
          decoding="async"
          srcSet={`${imageURL || '/defaultImage_707.webp'} 960w`}
          src={imageURL || `/defaultImage.webp`}
          sizes="300px"
          alt={roomName}
        />
      </ImageContainer>
      <TextContainer>
        <RoomTitle>{roomName}</RoomTitle>
        <Info>{description}</Info>
        <Address>{address}</Address>
      </TextContainer>
    </CardContainer>
  );
}

export default DetailCard;
