import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from '../Pages/MainPage.tsx';
import WishListPage from '../Pages/WishListPage.tsx';
import SearchResultPage from '../Pages/SearchResultPage.tsx';
import DetailInfoPage from '../Pages/DetailInfoPage.tsx';
import BookedListPage from '../Pages/BookedListPage.tsx';
import CardListingPage from '../Pages/CardListingPage.tsx';

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
        {/* cardListing은 카드 리스트 표시를 위한 임시 페이지 */}
        <Route path="/cardListing" element={<CardListingPage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
