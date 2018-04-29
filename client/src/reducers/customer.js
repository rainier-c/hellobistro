function customer(state = [], action) {
  switch(action.type) {
    case 'LOAD_RESTAURANT_LIST':
      return Object.assign({}, state, {
        restaurants: action.data,
      });
    case 'LOAD_SELECTED_RESTAURANT':
      return Object.assign({}, state, {
        currentRestaurant: action.data,
      });
    case 'ADD_TO_CART':
    console.log('state', state)
      return Object.assign({}, state, {
        cart: !state.cart ? [action.data] : [...state.cart, action.data],
      });
    default:
      return state;
  }
}

export default customer;