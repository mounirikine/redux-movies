import { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Header = () => {
  const cartMovies = useSelector((state) => state.movies); 
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          
          <span className="text-xl font-semibold"> Movies Shop</span>
        </div>

        <div className="relative">
          <button
            className="focus:outline-none"
            onClick={() => setCartOpen(!cartOpen)}
          >
            <FaShoppingCart className="h-6 w-6" />
          </button>

          {cartOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
              {cartMovies && cartMovies.length === 0 ? (
                <p className="p-2 text-gray-600">Your cart is empty</p>
              ) : (
                <ul>
                  {cartMovies.map((movie) => (
                    <li key={movie.id} className="flex justify-between items-center p-2 border-b text-black">
                      <span>{movie.Title}</span>
                      <span>{movie.Type}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
