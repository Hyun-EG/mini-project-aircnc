// 현재 주소 반환하기..
interface Coordinates {
  latitude: number;
  longitude: number;
}

const getCurrentPosition = async (): Promise<Coordinates> => {
  if (!navigator.geolocation) {
    throw new Error('Geolocation is not supported by this browser.');
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(error);
      },
    );
  });
};

const getAddressFromCoordinates = async (
  latitude: number,
  longitude: number,
): Promise<string> => {
  const apiKeyId = import.meta.env.VITE_NAVER_MAP_API_KEY_ID;
  const apiKey = import.meta.env.VITE_NAVER_MAP_API_KEY;

  const response = await fetch(
    `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${longitude},${latitude}&orders=roadaddr&output=json`,
    {
      headers: {
        'X-NCP-APIGW-API-KEY-ID': apiKeyId,
        'X-NCP-APIGW-API-KEY': apiKey,
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch address');
  }

  const data = await response.json();
  if (data.results && data.results.length > 0) {
    return `${data.results[0].region.area1.name} ${data.results[0].region.area2.name}`;
  }

  throw new Error('No address found');
};

export { getCurrentPosition, getAddressFromCoordinates };
