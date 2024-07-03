const getCurrentPosition = (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const getAddressFromCoordinates = async (
  latitude: number,
  longitude: number,
): Promise<any> => {
  const API_KEY = import.meta.env.VITE_NAVER_MAP_API_KEY;
  const API_KEY_ID = import.meta.env.VITE_NAVER_MAP_API_KEY_ID;

  const url = `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${longitude},${latitude}&sourcecrs=epsg:4326&output=json&orders=legalcode`;

  try {
    const response = await fetch(url, {
      headers: {
        'X-NCP-APIGW-API-KEY-ID': API_KEY_ID,
        'X-NCP-APIGW-API-KEY': API_KEY,
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch address');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Failed to fetch address from coordinates');
  }
};

export { getCurrentPosition, getAddressFromCoordinates };
