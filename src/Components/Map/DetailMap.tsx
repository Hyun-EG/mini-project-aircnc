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
      zoom: 16,
      disableDoubleClickZoom: true,
      disableDoubleTapZoom: true,
      disableKineticPan: true,
      disableTwoFingerTapZoom: true,
      draggable: false,
      pinchZoom: false,
      scrollWheel: false,
    };

    const map = new naver.maps.Map('detailMap', mapOptions);
    const marker = new naver.maps.Marker({
      position: mapOptions.center,
      map,
    });
  }, [listing]);

  return <MapContainer id="detailMap" width={width} height={height} />;
}
