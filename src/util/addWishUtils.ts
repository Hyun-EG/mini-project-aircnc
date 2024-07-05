import { Wishlist } from '../assets/interfaces.ts';

// eslint-disable-next-line camelcase
const addWishlist = async ({ roomID, userID, image_url }: Wishlist) => {
  const wishlist = JSON.parse(localStorage.getItem('wishlists') || '[]');

  const alreadyAdded = wishlist.some(
    (item: Wishlist) => item.roomID === roomID && item.userID === userID,
  );

  if (alreadyAdded) {
    alert('이미 위시리스트에 추가된 숙소입니다.');
    return; // 함수 종료
  }

  // eslint-disable-next-line camelcase
  wishlist.push({ roomID, userID, image_url });

  await new Promise<void>((resolve) => {
    localStorage.setItem('wishlists', JSON.stringify(wishlist));
    resolve();
  });

  alert('Wishlist에 추가되었습니다.');
};

export default addWishlist;
