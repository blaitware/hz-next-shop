import React, { useCallback } from 'react';
import { cartReducer, State, initialState } from './cart.reducer';
import { Item, getItem, inStock } from './cart.utils';
import { useLocalStorage } from '@lib/use-local-storage';
import { CART_KEY } from '@lib/constants';
import { useAtom } from 'jotai';
import { verifiedResponseAtom } from '@store/checkout';
interface CartProviderState extends State {
  addItemToCart: (item: Item, quantity: number) => void;
  removeItemFromCart: (_id: Item['_id']) => void;
  clearItemFromCart: (_id: Item['_id']) => void;
  getItemFromCart: (_id: Item['_id']) => any | undefined;
  isInCart: (_id: Item['_id']) => boolean;
  isInStock: (_id: Item['_id']) => boolean;
  resetCart: () => void;
}
export const cartContext = React.createContext<CartProviderState | undefined>(
  undefined
);

cartContext.displayName = 'CartContext';

export const useCart = () => {
  const context = React.useContext(cartContext);
  if (context === undefined) {
    throw new Error(`useCart must be used within a CartProvider`);
  }
  return context;
};

export const CartProvider: React.FC = (props) => {
  const [savedCart, saveCart] = useLocalStorage(
    CART_KEY,
    JSON.stringify(initialState)
  );
  const [state, dispatch] = React.useReducer(
    cartReducer,
    JSON.parse(savedCart!)
  );
  const [, emptyVerifiedResponse] = useAtom(verifiedResponseAtom);
  React.useEffect(() => {
    emptyVerifiedResponse(null);
  }, [emptyVerifiedResponse, state]);

  React.useEffect(() => {
    saveCart(JSON.stringify(state));
  }, [state, saveCart]);

  const addItemToCart = (item: Item, quantity: number) =>
    dispatch({ type: 'ADD_ITEM_WITH_QUANTITY', item, quantity });
  const removeItemFromCart = (_id: Item['_id']) =>
    dispatch({ type: 'REMOVE_ITEM_OR_QUANTITY', _id });
  const clearItemFromCart = (_id: Item['_id']) =>
    dispatch({ type: 'REMOVE_ITEM', _id });
  const isInCart = useCallback(
    (_id: Item['_id']) => !!getItem(state.items, _id),
    [state.items]
  );
  const getItemFromCart = useCallback(
    (_id: Item['_id']) => getItem(state.items, _id),
    [state.items]
  );
  const isInStock = useCallback(
    (_id: Item['_id']) => inStock(state.items, _id),
    [state.items]
  );
  const resetCart = () => dispatch({ type: 'RESET_CART' });
  const value = React.useMemo(
    () => ({
      ...state,
      addItemToCart,
      removeItemFromCart,
      clearItemFromCart,
      getItemFromCart,
      isInCart,
      isInStock,
      resetCart,
    }),
    [getItemFromCart, isInCart, isInStock, state]
  );
  return <cartContext.Provider value={value} {...props} />;
};
