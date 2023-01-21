import type {
  Signal} from "@builder.io/qwik";
import {
  $,
  component$,
  useClientEffect$,
  useContext,
  useSignal,
  useStore,
} from "@builder.io/qwik";
import { CART_STATE } from "~/constants";
import type { SelectedProductStore } from "~/routes/menu";
import type { CartItem, Product } from "~/types";

type MenuItemProps = {
  product: Product;
  showDialogStore: Signal<boolean>;
  selectedProductStore: SelectedProductStore;
};
export const MenuItem = component$<MenuItemProps>((props) => {
  const { product, showDialogStore, selectedProductStore } = props;
  const divRef = useSignal<Element>();
  const isInCartStore = useSignal(false);
  const currentCartCountOfProduct = useSignal(0);
  const cart = useContext(CART_STATE);
  const hasModifier = Object.keys(product.modifierGroups![0]).length > 0;

  const cartItemState = useStore<CartItem>({
    count: 1,
    product: product,
    modifiers: [],
  });

  // const productCountChange$ = $((cartItemKey: string, delta: number) => {
  //   if (cart.cartItems[cartItemKey].count + delta <= 0) {
  //     const newCartItems: { [key: string]: CartItem } = {};
  //     Object.keys(cart.cartItems)
  //       .filter((item) => item !== cartItemKey)
  //       .map((key) => (newCartItems[key] = cart.cartItems[key]));

  //     cart.cartItems = newCartItems;
  //   } else {
  //     const newCartItems: { [key: string]: CartItem } = {};
  //     Object.keys(cart.cartItems).forEach((key) =>
  //       key == cartItemKey
  //         ? (newCartItems[key] = {
  //             ...cart.cartItems[key],
  //             count: cart.cartItems[key].count + delta,
  //           })
  //         : (newCartItems[key] = cart.cartItems[key])
  //     );

  //     cart.cartItems = newCartItems;
  //     //   cart.cartItems[cartItemKey].count =  cart.cartItems[cartItemKey].count  +delta;
  //   }
  // });

  useClientEffect$(({ track }) => {
     track(() => cart.didStoreUpdate);
    if (
      Object.values(cart.cartItems).filter(
        (item) => item.product._id == product._id
      ).length
    ) {
      isInCartStore.value = true;

      currentCartCountOfProduct.value = Object.keys(cart.cartItems)
        .filter((key) => key.includes(product._id))
        .reduce((prev, curr) => prev + cart.cartItems[curr].count, 0);

      if (currentCartCountOfProduct.value) {
        divRef.value?.classList.remove("border-transparent");
        divRef.value?.classList.add("border-red-700");
      } else {
        divRef.value?.classList.remove("border-red-700");
        divRef.value?.classList.add("border-transparent");
      }
    } else {
      isInCartStore.value = false;
      currentCartCountOfProduct.value = 0;
      divRef.value?.classList.remove("border-red-700");
      divRef.value?.classList.add("border-transparent");
    }
  });

  const selectProduct = $(() => {
    if (hasModifier) {
      showDialogStore.value = true;
      selectedProductStore.selectedProduct = product;
    } else {
      cart.addToCart(cart, cartItemState, {});
    }
  });
  return (
    <>
      <div class=" flex flex-row max-h-60 justify-between sm:w-1/2  bg-white rounded border-b-2 last:border-b-0 border-gray-100 hover:shadow-xl ">
        <div class="pl-2 px-3 pr-3">
          <div
            class=" pl-2 flex-grow flex flex-col border-l-2 border-transparent  "
            ref={divRef}
          >
            <h3 class="text-sm font-semibold">{product.name} </h3>
            <div class="flex flex-row  text-xs">
              <div class="h-2 w-2 my-auto mr-3 bg-green-100 border-2 border-green-700 flex flex-row">
                <div class="w-0.5 h-0.5 bg-green-700 m-auto"></div>
              </div>
              <div class="font-semibold ">
                {currentCartCountOfProduct.value ? (
                  <span class="font-thin text-lg mr-2">
                    {currentCartCountOfProduct.value}x
                  </span>
                ) : (
                  <span></span>
                )}
                {product.price} $
              </div>
              {hasModifier ? (
                <span class=" text-[10px] text-gray-700 bg-green-100 border-l border-green-700 ml-2 px-1">
                  Customizable
                </span>
              ) : (
                <span></span>
              )}
            </div>
            <p class="text-sm font-thin flex-grow max-h-48 text-ellipsis py-2 ">
              {product.description.substring(0, 150)}{" "}
              {product.description.length > 150 ? "..." : ""}
            </p>
            {(isInCartStore.value && hasModifier) &&
            
              <div class="my-2 px-2 text-[10px] text-gray-500 border-l border-gray-600">
                "View Cart Page to Edit Customized Items"
              </div>
            }
            {/* <div class="my-2 px-2 text-[10px] text-gray-500 border-l border-gray-600">
              {isInCartStore.value && hasModifier ? (
                "View Cart Page to Edit Customized Items"
              ) : (
                <div class="hidden"></div>
              )}
            </div> */}
          </div>
        </div>
        <div class=" w-28 h-28 bg-red-200  shrink-0 relative mx-2 mb-2 rounded-lg">
          <img src="https://picsum.photos/200" alt="" class="rounded-lg" />
          <div class=" absolute bottom-0 w-full bg-black/70 p-1 rounded-lg ">
            {isInCartStore.value && !hasModifier ? (
              <div class=" w-full h-6 flex flex-row justify-between text-white text-xs font-bold">
                <button
                  class="w-6 h-6 bg-red-800/70 font-bold text-lg flex justify-center"
                  onClick$={() => cart.updateItemCount(cart, product._id, -1)}
                >
                  -
                </button>
                <div class="px-2 flex-grow text-center">
                  {currentCartCountOfProduct.value}
                </div>
                <button
                  class="w-6 bg-green-800/70 font-bold text-lg"
                  onClick$={() => cart.updateItemCount(cart, product._id, 1)}
                >
                  +
                </button>
              </div>
            ) : (
              <button
                class="w-full h-6 text-white text-[10px] font-bold opacity-100 text-opacity-100"
                onClick$={selectProduct}
              >
                {hasModifier ? "CUSTOMIZE" : "ADD"}
              </button>
            )}

            {/* {isInCartStore.value && !hasModifier ? (
              <div class="border w-1/2 border-gray-500 bg-gray-100 flex flex-row justify-between m-auto p-1">
                <button >-</button>
                <div class="px-2">{currentCartCountOfProduct.value}</div>
                <button>+</button>
              </div>
            ) : (
              <div class="border w-1/2 bg-green-700 text-white text-xs font-thin font-mono flex flex-row justify-center m-auto p-1 rounded">
                <button onClick$={selectProduct}> {hasModifier ? 'CUSTOM': 'ADD'} </button>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
});
