import { useEffect } from 'react';
import styled from 'styled-components';

const MapInstance = styled.div<{ width: string; height: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

interface MapProps {
  width: string;
  height: string;
}

function Map({ width, height }: MapProps) {
  const { naver } = window;

  useEffect(() => {
    const map = new naver.maps.Map('map', {
      center: new naver.maps.LatLng(37.5666805, 126.9784147),
      zoom: 10,
      mapTypeId: naver.maps.MapTypeId.NORMAL,
    });
  }, [naver]);

  return <MapInstance id="map" width={width} height={height} />;
}

export default Map;
