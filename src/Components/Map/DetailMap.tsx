import React, { useEffect } from 'react';
import styled from 'styled-components';

const MapContainer = styled.div<{ width: string; height: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  position: relative;
  border-radius: 20px;
`;

export default function DetailMap({ width, height, listing }) {
  useEffect(
    function () {
      if (!listing) return;

      const { naver } = window;

      const mapOptions = {
        center: new naver.maps.LatLng(
          parseFloat(listing.map_y),
          parseFloat(listing.map_x),
        ),
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

      let openInfoWindow;
      naver.maps.Event.addListener(marker, 'mouseover', function () {
        infowindow.open(map, marker);
        openInfoWindow = infowindow;
      });

      naver.maps.Event.addListener(marker, 'mouseout', function () {
        if (openInfoWindow) {
          openInfoWindow.close();
        }
      });
    },
    [listing],
  );

  return <MapContainer id="detailMap" width={width} height={height} />;
}
