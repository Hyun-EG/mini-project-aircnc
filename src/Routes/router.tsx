import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout.tsx';
import MainPage from '../Pages/MainPage.tsx';
import WishListPage from '../Pages/WishListPage.tsx';
import SearchResultPage from '../Pages/SearchResultPage.tsx';
import DetailInfoPage from '../Pages/DetailInfoPage.tsx';
import BookedListPage from '../Pages/BookedListPage.tsx';
import NotFoundPage from '../Pages/NotFoundPage.tsx';

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
