import { combineReducers } from 'redux';
import cartReducer from './cartReducer';
import favoritesReducer from './favoritesReducer';
import productsReducer from './productsReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  favorites: favoritesReducer,
  products: productsReducer,
  auth: authReducer

});

export default rootReducer;