import { FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import MainLayout from './components/MainLayout'; 
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import "./index.css";

const App: FC = () => (
  <CartProvider>
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <MainLayout>
              <CartPage />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  </CartProvider>
);

export default App;
