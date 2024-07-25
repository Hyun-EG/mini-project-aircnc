import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout.tsx';
import {
  SuspenseWithSpinner,
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
    errorElement: (
      <SuspenseWithSpinner>
        <NotFoundPage />
      </SuspenseWithSpinner>
    ),
    children: [
      {
        path: '',
        element: (
          <SuspenseWithSpinner>
            <MainPage />
          </SuspenseWithSpinner>
        ),
      },
      {
        path: 'search',
        element: (
          <SuspenseWithSpinner>
            <SearchResultPage />
          </SuspenseWithSpinner>
        ),
      },
      {
        path: 'detail/:id',
        element: (
          <SuspenseWithSpinner>
            <DetailInfoPage />
          </SuspenseWithSpinner>
        ),
      },
      {
        path: 'wishlist',
        element: (
          <SuspenseWithSpinner>
            <WishListPage />
          </SuspenseWithSpinner>
        ),
      },
      {
        path: 'booked',
        element: (
          <SuspenseWithSpinner>
            <BookedListPage />
          </SuspenseWithSpinner>
        ),
      },
    ],
  },
]);

export default router;
