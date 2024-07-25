import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { RoomResponse } from '../assets/interfaces.ts';
import formatNumber from '../util/formatNumber.ts';

export const CardContainer = styled.div`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
`;

export const Image = styled.img`
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

type CardProps = {
  card: RoomResponse;
  order?: number;
};

function Card({ card, order = 0 }: CardProps) {
  const { room_id: roomId, image_url: imageUrl, name, city, price } = card;
  const navigate = useNavigate();
  const [myMarker, setMyMarker] = useState<HTMLDivElement | null>(null);

  const handleClick = async () => {
    navigate(`/detail/${roomId}`);
  };

  const handleMouseEnter = () => {
    if (!order && order !== 0) {
      return;
    }

    const map = document.getElementById('map');

    if (!map) {
      return;
    }

    const marker =
      map.firstElementChild?.firstElementChild?.firstElementChild?.lastElementChild?.children
        .item(1)
        ?.children.item(order) as HTMLDivElement | null;

    if (!marker) {
      return;
    }

    marker.style.width = '36px';
    marker.style.height = '36px';
    marker.style.transform = 'translate(-4px, -4px)';
    marker.style.zIndex = '10000';

    const markerImage = marker.firstElementChild as HTMLImageElement;

    markerImage.style.width = '36px';
    markerImage.style.height = '36px';

    setMyMarker(marker);
  };

  const handleMouseLeave = () => {
    if (!myMarker) {
      return;
    }

    myMarker.style.width = '28px';
    myMarker.style.height = '28px';
    myMarker.style.transform = 'translate(0, 0)';
    myMarker.style.zIndex = '1000';

    const markerImage = myMarker.firstElementChild as HTMLImageElement;

    markerImage.style.width = '28px';
    markerImage.style.height = '28px';
  };

  return (
    <CardContainer
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ImageContainer>
        <Image
          loading={order < 4 ? 'lazy' : 'eager'}
          decoding="async"
          srcSet={`${imageUrl || '/defaultImage_471.webp'} 960w`}
          src={imageUrl || `/defaultImage_707.webp`}
          sizes="300px"
          alt={name}
        />
      </ImageContainer>
      <TextContainer>
        <Title>{name}</Title>
        <Address>{city}</Address>
        <Info>{formatNumber(price)}원/박</Info>
      </TextContainer>
    </CardContainer>
  );
}

export default Card;
