import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { RoomResponse } from '../../assets/interfaces.ts';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    naver: any;
  }
}

const MapInstance = styled.div<{ width: string; height: string }>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  right: 0;
  position: fixed !important;
  border-radius: 20px;
  @media (min-width: 1280px) {
    display: flex;
  }
`;

interface MapProps {
  width: string;
  height: string;
  listings: RoomResponse[];
}

function Map({ width, height, listings }: MapProps) {
  const mapRef = useRef<naver.maps.Map | null>(null);
  const markersRef = useRef<naver.maps.Marker[]>([]);

  useEffect(() => {
    if (listings.length === 0) return;

    const { naver } = window;

    if (!mapRef.current) {
      const initialCenter = new naver.maps.LatLng(
        listings[0].map_y,
        listings[0].map_x,
      );

      const mapOptions = {
        center: initialCenter,
        zoom: 12,
        zoomControl: true,
        zoomControlOptions: {
          style: naver.maps.ZoomControlStyle.SMALL,
          position: naver.maps.Position.TOP_RIGHT,
        },
      };

      mapRef.current = new naver.maps.Map('map', mapOptions);
    }

    const map = mapRef.current;
    if (!map) return;

    const bounds = new naver.maps.LatLngBounds();

    let openInfoWindow: naver.maps.InfoWindow | undefined;

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    listings.forEach((listing) => {
      const markerPosition = new naver.maps.LatLng(
        listing.map_y,
        listing.map_x,
      );

      const marker = new naver.maps.Marker({
        position: markerPosition,
        map,
        icon: {
          url: '/location_on.png',
          size: new naver.maps.Size(28, 28),
          scaledSize: new naver.maps.Size(28, 28),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(14, 28),
        },
      });

      markersRef.current.push(marker);
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

      naver.maps.Event.addListener(marker, 'mouseover', () => {
        marker.setIcon({
          url: '/location_on.png',
          size: new naver.maps.Size(36, 36),
          scaledSize: new naver.maps.Size(36, 36),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(18, 36),
        });
      });

      naver.maps.Event.addListener(marker, 'mouseout', () => {
        marker.setIcon({
          url: '/location_on.png',
          size: new naver.maps.Size(28, 28),
          scaledSize: new naver.maps.Size(28, 28),
          origin: new naver.maps.Point(0, 0),
          anchor: new naver.maps.Point(14, 28),
        });
      });

      naver.maps.Event.addListener(marker, 'click', () => {
        infowindow.open(map, marker);
        openInfoWindow = infowindow;
      });

      naver.maps.Event.addListener(map, 'click', () => {
        if (openInfoWindow) openInfoWindow.close();
      });
    });

    map.fitBounds(bounds);

    const getBounds = (bounds: naver.maps.LatLngBounds) => {
      const ne = bounds.getNE();
      const sw = bounds.getSW();

      const nw = new naver.maps.LatLng(ne.lat(), sw.lng());
      const se = new naver.maps.LatLng(sw.lat(), ne.lng());

      const coordinates = {
        northEast: { lat: ne.lat(), lng: ne.lng() },
        northWest: { lat: nw.lat(), lng: nw.lng() },
        southEast: { lat: se.lat(), lng: se.lng() },
        southWest: { lat: sw.lat(), lng: sw.lng() },
      };

      console.log('Map Bounds:', coordinates);
    };

    naver.maps.Event.addListener(map, 'bounds_changed', () => {
      const currentBounds = map.getBounds() as naver.maps.LatLngBounds;
      getBounds(currentBounds);
    });
  }, [listings]);

  return <MapInstance id="map" width={width} height={height} />;
}

export default Map;
