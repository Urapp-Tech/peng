import { Outlet } from 'react-router-dom';
import Header from '../common/header/Header';

function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default AppLayout;
