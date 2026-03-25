import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import UserDetail from './pages/UserDetail';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/user/:id" element={<UserDetail />} />
          </Routes>
        </main>
        <footer className="border-t border-gray-200 py-4 text-center text-xs text-gray-400 bg-white">
          BuyerForeSight &mdash; User Directory Dashboard &copy; {new Date().getFullYear()}
        </footer>
      </div>
    </BrowserRouter>
  );
}
