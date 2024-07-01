import React, { useEffect } from 'react';
import styled from 'styled-components';

const MapInstance = styled.div<{ width: string; height: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin-top: 13vh;
  margin-left: 1vh;
  display: flex;
  right: 0;
  position: fixed !important;
  border-radius: 20px;
`;

interface MapProps {
  width: string;
  height: string;
  listings: RoomData[];
}

function Map({ width, height, listings }: MapProps) {
  useEffect(() => {
    if (listings.length === 0) return;

    const { naver } = window;

    const initialCenter = new naver.maps.LatLng(
      parseFloat(listings[0].map_y),
      parseFloat(listings[0].map_x),
    );

    const mapOptions = {
      center: initialCenter,
      zoom: 12.5,
      zoomControl: true,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.TOP_RIGHT,
      },
    };

    const map = new naver.maps.Map('map', mapOptions);
    const bounds = new naver.maps.LatLngBounds();

    let openInfoWindow;

    listings.forEach((listing) => {
      const markerPosition = new naver.maps.LatLng(
        parseFloat(listing.map_y),
        parseFloat(listing.map_x),
      );
      const marker = new naver.maps.Marker({
        position: markerPosition,
        map: map,
      });

      bounds.extend(markerPosition);

      const contentString = `
  <div style="max-width: 250px; background-color: #fff; padding-bottom: 2vh; line-height:15px; border-radius: 20px; box-shadow: 0px 0px 10px rgba(0,0,0,0.2);">
  <img src="${listing.image_url}" alt="${listing.name}" style="width: 100%; height: 20vh; border-top-left-radius: 20px; border-top-right-radius: 20px;" />
    <div style="padding: 1vh;">
    <p style="font-size: 2vh; font-weight: bold; display:block; padding-bottom: 1vh;">${listing.name}</p>
    <p style="font-size: 1.5vh;">주소: ${listing.address}</p>
    <p style="font-size: 1.5vh;">가격: ${listing.price}원</p>
    <p style="font-size: 1.5vh;">옵션: ${listing.description}</p>
    </div>
  </div>
`;

      const infowindow = new naver.maps.InfoWindow({
        content: contentString,
        borderWidth: 0,
        maxWidth: 250,
        disableAnchor: true,
        backgroundColor: 'transparent',
      });

      naver.maps.Event.addListener(marker, 'mouseover', function () {
        infowindow.open(map, marker);
        openInfoWindow = infowindow;
      });

      naver.maps.Event.addListener(marker, 'mouseout', function () {
        if (openInfoWindow) {
          openInfoWindow.close();
        }
      });
    });

    map.fitBounds(bounds);
  }, [listings]);

  return <MapInstance id="map" width={width} height={height} />;
}

export default Map;
