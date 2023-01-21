import type {
  QRL} from "@builder.io/qwik";
import {
  $,
  component$,
  useContext,
  useSignal,
  useStore,
  useTask$,
} from "@builder.io/qwik";
import { CART_STATE } from "~/constants";
import type { SelectedProductStore } from "~/routes/menu";
import type { CartItem, Modifier, ModifierGroupsEntity } from "~/types";
type AddCartCompProps = {
  selectedProductStore: SelectedProductStore;
  onClose: QRL<() => void>;
};

export const AddToCart = component$<AddCartCompProps>((props) => {
  const cartState = useContext(CART_STATE);
  const productStore = props.selectedProductStore;
  const cartItemState = useStore<CartItem>({
    count: 1,
    product: productStore.selectedProduct!,
    modifiers: [],
  });

  const selectedModifiers = useStore<{
    hasChanged: boolean;
    modifiers: { [Key: number]: Modifier };
  }>({ hasChanged: false, modifiers: {} });

  const selectedCartTotal = useSignal(0);

  useTask$(({ track }) => {
     track(() => selectedModifiers.hasChanged || cartItemState.count);

    selectedCartTotal.value = cartItemState.count * (productStore.selectedProduct!.price +
    parseInt( Object.values(selectedModifiers.modifiers).reduce(
     (tot, mod) => tot + mod.price,
     0
   ).toString()))
      
  });

  // const handleCartCountButton = $((event: any) => {
  //   if (event.target.id == "addBtn") {
  //     cartItemState.count = cartItemState.count + 1;
  //   } else {
  //     if (cartItemState.count <= 0) return;
  //     cartItemState.count = cartItemState.count - 1;
  //   }
  // });

  const addToCart = $(() => {
    return cartState.addToCart(
      cartState,
      cartItemState,
      selectedModifiers.modifiers
    );
  });

  const changeModifer = $(
    (modifier: Modifier, mIndex: number, itemIndex: number) => {
      selectedModifiers.modifiers[mIndex] = {
        ...modifier,
        id: Number(`${mIndex}${itemIndex}`),
      };

      selectedModifiers.hasChanged = !selectedModifiers.hasChanged;
    }
  );
  return (
    <>
      <div class="flex flex-col  relative h-screen">
        <div class="flex flex-row bg-white mt-2 pl-4 pr-2 py-2 ">
          <div class="flex-grow">
            <div class="text-lg font-normal">
              {productStore.selectedProduct!.name}
            </div>
            <div class="font-light text-sm ">
              {productStore.selectedProduct!.price} $
            </div>
          </div>

          <div
            class="w-6 h-6 bg-gray-300 rounded-full flex justify-center items-center shrink-0 text-xs font-bold cursor-pointer"
            onClick$={props.onClose}
          >
            X
          </div>
        </div>
        <div class="mt-2">
          {productStore.selectedProduct!.modifierGroups!.map(
            (group: ModifierGroupsEntity, mIndex) => {
              return (
                <div class=" bg-white px-4 py-2 ">
                  <div class="flex flex-row justify-between py-2 font-normal border-b border-gray-200">
                    <h3>{group.description}</h3>
                    <p class="font-thin">Required</p>
                  </div>
                  {group.modifiers?.map((modifier, index) => {
                    return (
                      <div class="pt-2">
                        <div class="flex flex-row text-sm">
                          <input
                            type="radio"
                            id={`${mIndex}${index}`}
                            name={`modifier${mIndex}`}
                            value={`${mIndex}${index}`}
                            onInput$={
                              () => changeModifer(modifier, mIndex, index)
                              // (selectedModifiers[mIndex] = {
                              //   ...modifier,
                              //   id: Number(`${mIndex}${index}`),
                              // })
                            }
                          />
                          <label for={`${mIndex}${index}`} class="ml-2">
                            {modifier.description}
                          </label>
                          <span
                            class="ml-auto 
                          "
                          >
                            {modifier.price} $
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            }
          )}
        </div>

        <div class="w-screen p-4 fixed bottom-1 flex flex-row">
          <div class="p-3 w-full bg-gray-800 rounded text-white font-bold flex flex-row items-center">
            <div class=" w-full mr-1 h-6 px-2 flex flex-row justify-between items-center text-xs font-bold  bg-gray-200 p-1 rounded-lg basis-0 text-black">
              <button
                class="w-4 h-4 font-bold text-lg flex justify-center items-center"
                onClick$={() => { if(cartItemState.count <=1)  return ; cartItemState.count--}}
              >
                -
              </button>
              <div class="px-2 flex-grow text-center text-sm">
                {cartItemState.count}
              </div>
              <button
                class="w-4 h-4  font-bold text-lg  flex justify-center items-center"
                onClick$={() => cartItemState.count ++}
              >
                +
              </button>
            </div>
            <div class="font-thin">{selectedCartTotal.value}</div>
            <button class="ml-auto underline" onClick$={addToCart}>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </>
  );
});
