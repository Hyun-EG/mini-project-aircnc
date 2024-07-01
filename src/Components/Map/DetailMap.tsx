import { useEffect } from 'react';
import styled from 'styled-components';
import { RoomDetailData } from '../../assets/interfaces.ts';

const MapContainer = styled.div<{ width: string; height: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  position: relative;
  border-radius: 20px;
`;

interface DetailMapProps {
  width: string;
  height: string;
  listing: RoomDetailData;
}

export default function DetailMap({ width, height, listing }: DetailMapProps) {
  useEffect(() => {
    if (!listing) return;

    const { naver } = window;

    const mapOptions = {
      center: new naver.maps.LatLng(listing.map_y, listing.map_x),
      zoom: 18,
      zoomControl: true,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.TOP_RIGHT,
      },
    };

    const map = new naver.maps.Map('detailMap', mapOptions);
    const marker = new naver.maps.Marker({
      position: mapOptions.center,
      map,
    });

    const contentString = `
      <div>
        <img src="${listing.image_url}" alt="${listing.name}" style="width: 100%; height: 20vh;" />
        <p style="font-size: 2vh; font-weight: bold;">${listing.name}</p>
        <p style="font-size: 1.5vh;">주소: ${listing.address}</p>
        <p style="font-size: 1.5vh;">가격: ${listing.price}원</p>
        <p style="font-size: 1.5vh;">옵션: ${listing.description}</p>
      </div>
    `;

    const infowindow = new naver.maps.InfoWindow({
      content: contentString,
      maxWidth: 250,
    });

    let openInfoWindow: naver.maps.InfoWindow | undefined;

    naver.maps.Event.addListener(marker, 'mouseover', () => {
      infowindow.open(map, marker);
      openInfoWindow = infowindow;
    });

    naver.maps.Event.addListener(marker, 'mouseout', () => {
      if (openInfoWindow) {
        openInfoWindow.close();
      }
    });
  }, [listing]);

  return <MapContainer id="detailMap" width={width} height={height} />;
}
