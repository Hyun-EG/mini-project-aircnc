import { lazy } from 'react';

export const MainPage = lazy(async () => await import('../Pages/MainPage.tsx'));

export const SearchResultPage = lazy(
  async () => await import('../Pages/SearchResultPage.tsx'),
);

export const DetailInfoPage = lazy(
  async () => await import('../Pages/DetailInfoPage.tsx'),
);

export const WishListPage = lazy(
  async () => await import('../Pages/WishListPage.tsx'),
);

export const BookedListPage = lazy(
  async () => await import('../Pages/BookedListPage.tsx'),
);

export const NotFoundPage = lazy(
  async () => await import('../Pages/NotFoundPage.tsx'),
);
