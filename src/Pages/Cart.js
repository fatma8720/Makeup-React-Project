import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { removeFromCart, updateQuantity } from '../Store/action';
import './Cart.css'; 
function Cart() {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    dispatch(updateQuantity(productId, newQuantity));
  };

  const cartTotal = cart.reduce((total, product) => {
    return total + (product.price * product.quantity);
  }, 0);

  const taxRate = 0.1;
  const tax = cartTotal * taxRate;

  const grandTotal = cartTotal + tax;

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center mb-2 py-5">Shopping Cart</h1>
      <div className="d-flex justify-content-center">
        <div className="card"style={{transform:'none'}}>
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th className='py-4 px-4'>Name</th>
                <th className='py-4'>Photo</th>
                <th className='py-4'>Quantity</th>
                <th className='py-4'>Total Price</th>
                <th className='py-4'>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((product) => (
                <tr key={product.id}>
                  <td className='py-4 px-4'>{product.name.substring(0, 10)}...</td>
                  <td>
                    <Link to={`/product/${product.id}`} className="text-decoration-none text-dark"> 
                      <img src={product.image_link} alt={product.name} className="img-fluid" style={{width: '60px', height: 'auto'}}/>
                    </Link>
                  </td>
                  <td>
                    <div className='quantity-controls py-2'>
                    <button className="btn btn-dark me-2" onClick={() => handleUpdateQuantity(product.id, product.quantity - 1)} disabled={product.quantity <= 1}>-</button>
                      <span className="quantity">{product.quantity}</span>
                      <button className="btn btn-dark ms-2" onClick={() => handleUpdateQuantity(product.id, product.quantity + 1)}>+</button>
                    </div>
      
                  </td>
                  <td className='py-4'>${(product.price * product.quantity).toFixed(2)}</td>
                  <td>
                    <button className="btn btn-danger my-2" onClick={() => handleRemoveFromCart(product.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3"></td>
                <td className="fw-bold">Cart Total:</td>
                <td>${cartTotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="3"></td>
                <td className="fw-bold">Tax:</td>
                <td>${tax.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="3"></td>
                <td className="fw-bold">Grand Total:</td>
                <td>${grandTotal.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
          <div className="text-center">
            <button className="btn btn-dark my-3">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
