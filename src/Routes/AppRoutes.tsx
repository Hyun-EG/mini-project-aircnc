import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from '../Pages/MainPage.tsx';
import WishListPage from '../Pages/WishListPage.tsx';
import SearchResultPage from '../Pages/SearchResultPage.tsx';
import DetailInfoPage from '../Pages/DetailInfoPage.tsx';
import BookedListPage from '../Pages/BookedListPage.tsx';
import NotFoundPage from '../Pages/NotFoundPage.tsx';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/search" element={<SearchResultPage />} />
        <Route path="/detail" element={<DetailInfoPage />} />
        {/* wishlist와 booked는 추후 PrivateRoute로 수정,, notion에서 링크 확인하기 */}
        <Route path="/wishlist" element={<WishListPage />} />
        <Route path="/booked" element={<BookedListPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
