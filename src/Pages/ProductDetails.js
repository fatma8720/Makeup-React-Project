import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, addToCart, updateQuantity, removeFromFavorites } from '../Store/action';
import { FaHeart } from 'react-icons/fa';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const cart = useSelector(state => state.cart);
  const favorites = useSelector(state => state.favorites);
  const history = useHistory();
  const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated')); 

  useEffect(() => {
    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    if (product) {
      const cartProduct = cart.find(item => item.id === product.id);
      if (cartProduct) {
        setQuantity(cartProduct.quantity);
      }
    }
  }, [product, cart]);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`http://makeup-api.herokuapp.com/api/v1/products/${id}.json`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (isAuthenticated) {
      dispatch(addToCart({ ...product, quantity }));
      console.log(`Adding ${quantity} of ${product.name} to cart.`);
    } else {
      history.push('/login');
    }
  };

  const handleAddToFavorites = () => {
    dispatch(addToFavorites(product));
  };

  const handleRemoveFromFavorites = () => {
    dispatch(removeFromFavorites(product.id));
  };

  const handleUpdateQuantity = (newQuantity) => {
    setQuantity(newQuantity);
    dispatch(updateQuantity(product.id, newQuantity));
  };

  const totalPrice = product ? product.price * quantity : 0;

  return (
    <main className="my-5">
      <div className="container py-5 px-5 shadow">
        {product ? (
          <div className="product-details bg-white p-5">
            <div className="row">
              <div className="col-md-6">
                <img src={product.image_link} alt={product.name} className="img-fluid" />
              </div>
              <div className="col-md-6">
                <h2 className="fw-bold">{product.name}</h2>
                <p className="fs-6 text-muted">{product.category}</p>
                <p className="fs-5">${product.price}</p>
                <div className="quantity-controls mb-3">
                  <button className="btn btn-dark me-2" onClick={() => handleUpdateQuantity(quantity - 1)} disabled={quantity <= 1}>-</button>
                  <span className="quantity">{quantity}</span>
                  <button className="btn btn-dark ms-2" onClick={() => handleUpdateQuantity(quantity + 1)}>+</button>
                </div>
                <p className="fs-5">Total: ${totalPrice.toFixed(2)}</p>
                <p className="fs-6">{product.description}</p>
                <div className="d-flex align-items-center">
                  <button className="btn btn-dark me-3" onClick={handleAddToCart} disabled={cart.some(item => item.id === product.id)}>
                    {cart.some(item => item.id === product.id) ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                  {favorites.some(item => item.id === product.id) ? (
                    <button className="btn btn-danger text-light" onClick={handleRemoveFromFavorites}>
                      <FaHeart style={{ fontSize: '1.5rem' }} />
                    </button>
                  ) : (
                    <button className="btn btn-outline-dark" onClick={handleAddToFavorites} disabled={favorites.some(item => item.id === product.id)}>
                      <FaHeart style={{ fontSize: '1.5rem' }} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
};

export default ProductDetails;
