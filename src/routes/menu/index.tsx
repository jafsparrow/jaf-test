import type { QRL} from "@builder.io/qwik";
import { useContext } from "@builder.io/qwik";
import { $, useSignal, useStore } from "@builder.io/qwik";
import { component$, Resource, useResource$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { AddToCart } from "~/components/add-to-cart/add-to-cart";
import { SubMenu } from "~/components/submenu/submenu";
import { CART_STATE } from "~/constants";
import type { CategoryViseProducts, Product } from "~/types";
import { getProducts } from "~/utils/api";

export interface ModalProps {
  onClose: QRL<() => void>;
}

export type SelectedProductStore = Record<string, Product | null>;

export default component$(() => {
  const showDialog = useSignal<boolean>(false);
  const showMenuSection = useSignal<boolean>(false);
  const selectedProductStore = useStore<SelectedProductStore>({
    selectedProduct: null,
  });
  const productsResources = useResource$<CategoryViseProducts>(async () => {
  try {
    const products = await getProducts("products/list");
   
    // console.log('getttting resouce done', products)
    console.log("show dialog", products);
    // console.log("selectedProduct", selectedProductStore);
    return products;
  } catch(error) {
    console.log(error)
    return {}
  }
 
  });

  const onDialogClose$ = $(() => {
    showDialog.value = false;
    selectedProductStore.seletedProduct = null;
  });

  const cart = useContext(CART_STATE);

  return (
    <>
      <Resource
        value={productsResources}
        onPending={() => <div>waiting ..pending...</div>}
        onRejected={() => <div>bloody shit happened</div>}
        onResolved={(collection) => {
          return (
            <>
              <div class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-4">
                <div class="font-bold text-2xl text-white">
                  Jafar's Resto Cafe
                </div>
                <div class="font-thin text-sm text-white ">
                  Where men get together like real heroes
                </div>
                <div class="text-xs text-gray-300 font-semibold">
                  Cornel Street, Mlp-616305
                </div>
              </div>

              {Object.keys(collection).map((key) => {
                return (
                  <div id={key}>
                    <SubMenu
                      products={collection[key]}
                      title={key}
                      showDialogStore={showDialog}
                      selectedProductStore={selectedProductStore}
                    />
                  </div>
                );
              })}

              {showDialog.value && selectedProductStore.selectedProduct ? (
                <div class="fixed top-0 left-0 z-10 w-full  bg-black bg-opacity-40 ">
                  <div class="bg-gray-100">
                    <AddToCart
                      onClose={onDialogClose$}
                      selectedProductStore={selectedProductStore}
                    ></AddToCart>
                  </div>
                </div>
              ) : (
                <div></div>
              )}

              <div class="w-screen px-4 fixed bottom-1">
                {showMenuSection.value ? (
                  <div class="h-[200px] pl-2 pr-2 pb-5 pt-2 bg-gray-100 rounded">
                    {/* <div class="flex flex-row">
                      <div class="w-5 h-5 ml-auto bg-gray-700 text-white text-center" >
                        x
                      </div>
                    </div> */}
                    <div></div>
                    {Object.entries(collection).map((values) => (
                      <div class="p-2 m-1 bg-white rounded ">
                        <a
                          href={`#${values[0]}`}
                          class="w-full flex flex-row justify-between"
                          onClick$={() => showMenuSection.value = false}                        >
                          <span>{values[0]}</span>
                          <span>{values[1].length}</span>
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div class="flex flex-row justify-center mb-1">
                    <div class="p-2 rounded-full text-center text-white bg-blue-700 font-semibold w-1/2" onClick$={() => showMenuSection.value = true}>
                      Menu Choices
                    </div>
                  </div>
                )}

                {Object.keys(cart.cartItems).length > 0 && (
                  <div class=" p-4 py2 bg-gray-800 rounded text-white text-sm font-semibold  flex flex-row ">
                    <div class="">8 Items | 102.0 $</div>
                    <div class="ml-auto underline">
                      {" "}
                      <Link href="/mycart" class="text-white">
                        VIEW CART
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </>
          );
        }}
      />
    </>
  );
});
