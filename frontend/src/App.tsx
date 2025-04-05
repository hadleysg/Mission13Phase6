import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookListPage from './pages/BookListPage';
import CartPage from './pages/CartPage';
import './App.css';
import AdminPage from './pages/AdminPage';

// Hadley Garff 4-14
// This app shows a list of books that can be sorted from a-z based on the title
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookListPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/adminbooks" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
