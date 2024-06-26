import { Wishlist } from '../assets/interfaces.ts';

const addWishlist = ({ roomID, userID }: Wishlist) => {
  const wishlist = JSON.parse(localStorage.getItem('wishlists') || '[]');
  wishlist.push({ roomID, userID });
  localStorage.setItem('wishlists', JSON.stringify(wishlist));
};

export default addWishlist;
