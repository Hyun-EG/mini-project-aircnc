import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout.tsx';
import {
  MainPage,
  SearchResultPage,
  DetailInfoPage,
  WishListPage,
  BookedListPage,
  NotFoundPage,
} from './Routes.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: '', element: <MainPage /> },
      { path: 'search', element: <SearchResultPage /> },
      { path: 'detail/:id', element: <DetailInfoPage /> },
      { path: 'wishlist', element: <WishListPage /> },
      { path: 'booked', element: <BookedListPage /> },
    ],
  },
]);

export default router;
