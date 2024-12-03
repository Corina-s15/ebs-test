import { FC } from 'react';
import { Link } from 'react-router-dom';

const Header: FC = () => (
  <header>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/cart">Cart</Link>
    </nav>
  </header>
);

export default Header;
