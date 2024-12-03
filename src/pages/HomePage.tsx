import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../context/utils';
import '../styles/HomePage.css';
import { Product } from './type';

const HomePage: FC = () => {
  const { addToCart, removeFromCart, cart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage, setProductsPerPage] = useState<number>(12);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Only filtered products
  const [paginatedProducts, setPaginatedProducts] = useState<Product[]>([]); // Derived state
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = parseInt(params.get('page') || '1', 10);
    const category = params.get('category') || 'all';
    setCurrentPage(page);
    setSelectedCategory(category);
  }, [location.search]);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data: Product[] = await response.json();
        setProducts(data);
        setCategories(['all', ...new Set(data.map((product) => product.category))]);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = selectedCategory === 'all'
      ? products
      : products.filter((product) => product.category === selectedCategory);
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [selectedCategory, products]);

  useEffect(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    setPaginatedProducts(currentProducts);
  }, [currentPage, filteredProducts, productsPerPage]);

  const handleFilter = (category: string) => {
    setSelectedCategory(category);
    navigate(`?category=${category}&page=1`); // Reset to first page when category changes
  };

  const handleSort = (order: 'asc' | 'desc') => {
    setSortOrder(order);
    const sortedProducts = [...filteredProducts].sort((a, b) =>
      order === 'asc' ? a.price - b.price : b.price - a.price
    );
    setFilteredProducts(sortedProducts);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    navigate(`?category=${selectedCategory}&page=${page}`);
  };

  const isInCart = (id: number) => cart.some((item) => item.id === id);

  const handleViewCart = () => {
    navigate('/cart');
  };

  const _handleFilter = (e: { target: { value: string; }; }) => handleFilter(e.target.value);
  const _handleSort = (e: { target: { value: string; }; }) => handleSort(e.target.value as 'asc' | 'desc');

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const buttonPrev = () => handlePageChange(currentPage - 1);
  const buttonNext = () => handlePageChange(currentPage + 1);

  return (
    <div>
      <h1>Product Catalog</h1>
      <button className="view-cart-button" onClick={handleViewCart}>
        View Cart ({cart.length})
      </button>

      <div id="filter-sort">
        <div>
          <label htmlFor="category">Filter by Category:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={_handleFilter}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="sort">Sort by Price:</label>
          <select
            id="sort"
            value={sortOrder}
            onChange={_handleSort}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <div className="products-grid">
        {paginatedProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>Price: ${product.price.toFixed(2)}</p>
            <p>Category: {product.category}</p>
            {isInCart(product.id) ? (
              <button
                className="remove-from-cart"
                onClick={() => removeFromCart(product.id)}
              >
                Remove from Cart
              </button>
            ) : (
              <button
                className="add-to-cart"
                onClick={() =>
                  addToCart({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    category: product.category,
                    image: product.image,
                    quantity: 1,
                  })
                }
              >
                Add to Cart
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="pagination">
        <button
          onClick={buttonPrev}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{currentPage} / {totalPages}</span>
        <button
          onClick={buttonNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
