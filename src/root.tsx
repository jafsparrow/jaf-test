import { $,component$, useContextProvider, useStore, useStyles$, useTask$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';
import { CartStoreState, CART_STATE } from './constants';

import globalStyles from './global.css?inline';
import { CartItem, Tax } from './types';

export const getTaxedSubTotal = (total: number, tax: Tax): number => {
  let multiplyValue = 1;
  if (tax.isPercentage) multiplyValue = 0.01;

  return parseFloat((total * multiplyValue * tax.value).toFixed(2));
};

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Dont remove the `<head>` and `<body>` elements.
   */
  useStyles$(globalStyles);
  const cartStore = useStore<CartStoreState>(
    {
      cartItems: {},
      placeOrderSpinner: false,
      createdAt: Date().toString(),
      taxes: [
        {
          name: "CGST",
          isPercentage: true,
          value: 9,
          printName: "CGST",
        },
        {
          name: "SGST",
          isPercentage: true,
          value: 9,
          printName: "SGST",
        },
      ],
      note: "",
      taxesApplied: [],
      total: 0,
      addToCart: $((cartState, item, selectedModifiers = {}) => {
        const newCartItem = item;
        newCartItem.modifiers = Object.values(selectedModifiers);
        let key = "";
        newCartItem.modifiers?.forEach(
          (modifier) => (key = key + modifier.id?.toString())
        );
        const generatedId = `${item.product._id}${key}`;
        const cartItems = { ...cartState.cartItems };
        cartItems[generatedId] = {
          ...(cartItems[generatedId] || {}),
          ...{
            ...newCartItem,
            count: cartItems[generatedId]
              ? cartItems[generatedId].count + newCartItem.count
              : newCartItem.count,
          },
        };

        cartState.cartItems = cartItems;
        cartState.didStoreUpdate = !cartState.didStoreUpdate;
      }),
      didStoreUpdate: false,
      updateItemCount: $((cart, cartItemKey, delta) => {
        console.log("key passed", cartItemKey);
        if (cart.cartItems[cartItemKey].count + delta <= 0) {
          console.log('inside delta')
          const newCartItems: { [key: string]: CartItem } = {};
          Object.keys(cart.cartItems)
            .filter((item) => item !== cartItemKey)
            .map((key) => (newCartItems[key] = cart.cartItems[key]));
            cart.cartItems = newCartItems;
           
          console.log('did update value',cart.didStoreUpdate)
          cart.didStoreUpdate = !cart.didStoreUpdate;
          console.log('did update value',cart.didStoreUpdate)
           //hack to get the rerender coz cartItems Object change wasn't trigerring rebuild
        } else {
          const newCartItems: { [key: string]: CartItem } = {};
          Object.keys(cart.cartItems).forEach((key) =>
            key == cartItemKey
              ? (newCartItems[key] = {
                  ...cart.cartItems[key],
                  count: cart.cartItems[key].count + delta,
                })
              : (newCartItems[key] = cart.cartItems[key])
          );

          cart.cartItems = newCartItems;
          console.log('did update value',cart.didStoreUpdate)
        cart.didStoreUpdate = !cart.didStoreUpdate;
        console.log('did update value',cart.didStoreUpdate)
        }
      }),
    },
    { recursive: true }
  );

  //  const adddd = $(()=> console.log('ble'))
  useContextProvider(CART_STATE, cartStore);

  useTask$(({ track }) => {
    const cartItems = track(() => cartStore.cartItems);
    cartStore.total = Object.values(cartItems)?.reduce((tot, cartItem) => {
      return (
        tot +
        (cartItem.product.price +
          cartItem.modifiers!.reduce(
            (prev, curr) => prev + parseInt(curr?.price.toString()),
            0
          )) *
          cartItem.count
      );
    }, 0);

    (cartStore.taxesApplied = cartStore.taxes?.map((tax) => {
      return {
        name: tax.printName,
        taxValue: getTaxedSubTotal(cartStore.total, tax),
      };
    })),
      (cartStore.taxedTotal =
        parseInt(cartStore.taxes!.reduce(
          (a, b) => a + getTaxedSubTotal(cartStore.total, b),
          cartStore.total
        )
        .toFixed(2)));
  });

 

  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />
        <RouterHead />
      </head>
      <body lang="en" class="font-sans leading-none bg-gray-100 mb-8 ">
        <RouterOutlet />
        <ServiceWorkerRegister />
      </body>
    </QwikCityProvider>
  );
});
