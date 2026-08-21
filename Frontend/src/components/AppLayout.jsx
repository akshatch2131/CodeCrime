import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden font-body-md text-body-md">
      <Sidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-background relative">
        <TopBar />
        <div className="flex-1 overflow-y-auto p-xl scroll-smooth">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
