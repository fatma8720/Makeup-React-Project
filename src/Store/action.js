
export const addToFavorites = (product) => ({
  type: 'ADD_TO_FAVORITES',
  payload: product,
});

export const removeFromFavorites = (productId) => ({
  type: 'REMOVE_FROM_FAVORITES',
  payload: productId,
});


export const addToCart = (product) => ({
  type: 'ADD_TO_CART',
  payload: { ...product, quantity: 1 }
});

export const removeFromCart = (productId) => ({
  type: 'REMOVE_FROM_CART',
  payload: productId
});

export const updateQuantity = (productId, quantity) => ({
  type: 'UPDATE_QUANTITY',
  payload: { productId, quantity }
});


export const loginUser = (userData, history) => {
  return (dispatch) => {
   
    setTimeout(() => {
      if (userData.email === 'example@example.com' && userData.password === 'password') {
        localStorage.setItem('user', JSON.stringify(userData));
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: userData
        });
        history.push('/');
      } else {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: 'Invalid email or password'
        });
      }
    }, 1000); 
  };
};


export const registerUser = (userData, history) => {
  return (dispatch) => {

    setTimeout(() => {
      if (userData.name && userData.email && userData.username && userData.password) {
        localStorage.setItem('user', JSON.stringify(userData));
        dispatch({
          type: 'REGISTER_SUCCESS',
          payload: userData
        });
        history.push('/');
      } else {
        dispatch({
          type: 'REGISTER_FAILURE',
          payload: 'Please fill in all required fields'
        });
      }
    }, 1000);
  };
};


export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem('user');
    dispatch({
      type: 'LOGOUT'
    });
  };
};
