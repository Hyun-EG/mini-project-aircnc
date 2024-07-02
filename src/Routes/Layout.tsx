import { Outlet } from 'react-router-dom';
import Header from '../Components/Header/Header.tsx';

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Layout;
