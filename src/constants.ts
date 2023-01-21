import { createContext, QRL } from '@builder.io/qwik';
import { AppState, CartItem, CartState, Modifier } from './types';



export const APP_STATE = createContext<AppState>('app_state');

export const CART_STATE = createContext<CartStoreState>('cart_state');

export const AUTH_TOKEN = 'authToken';

export const VENDURE_PUBLIC_URL = 'http://localhost:3333/api';
export type CartStoreState = CartState &  {
    didStoreUpdate: boolean,
    
    addToCart: QRL<(cart: CartStoreState, item: CartItem, modifiers: SelectedModifiers) => void>;
    updateItemCount: QRL<(cart: CartStoreState, itemKey: string, delta: number) => void>;
    
  } 

  
  export type SelectedModifiers = { [Key: number]: Modifier }