import { Wishlist } from '../assets/interfaces.ts';

const addWishlist = async ({ roomID, userID }: Wishlist) => {
  const wishlist = JSON.parse(localStorage.getItem('wishlists') || '[]');

  const alreadyAdded = wishlist.some(
    (item: Wishlist) => item.roomID === roomID && item.userID === userID,
  );

  if (alreadyAdded) {
    alert('이미 위시리스트에 추가된 숙소입니다.');
    return;
  }

  wishlist.push({ roomID, userID });

  await new Promise((resolve) => {
    localStorage.setItem('wishlists', JSON.stringify(wishlist));
    resolve();
  });

  alert('Wishlist에 추가되었습니다.');
};

export default addWishlist;
