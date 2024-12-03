import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { CartProvider } from '../context/CartContext';
import HomePage from '../pages/HomePage';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { id: 1, title: 'Product 1', price: 10.0, category: 'electronics', image: 'product1.jpg' },
        { id: 2, title: 'Product 2', price: 20.0, category: 'jewelery', image: 'product2.jpg' },
      ]),
  } as unknown as Response)
);

describe('HomePage', () => {
  test('renders products and filters by category', async () => {
    render(
      <BrowserRouter>
        <CartProvider>
          <HomePage />
        </CartProvider>
      </BrowserRouter>
    );

    await waitFor(() => expect(screen.getByText('Product 1')).toBeTruthy());
  });
});

