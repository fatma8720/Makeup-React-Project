const initialCartState = [];

const cartReducer = (state = initialCartState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.payload];
    case 'REMOVE_FROM_CART':
      const confirmed = window.confirm('Are you sure you want to remove this item from the cart?');
      if (confirmed) {
        return state.filter(item => item.id !== action.payload);
      } else {
        return state;
      }
    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    default:
      return state;
  }
};

export default cartReducer;