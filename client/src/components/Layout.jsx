import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <main className="scrollarea">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
