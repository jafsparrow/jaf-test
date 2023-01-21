import { $, component$, useContext } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { CART_STATE } from "~/constants";
import type { CartItem } from "~/types";

export const Cart = component$(() => {
  const cart = useContext(CART_STATE);
  const nav = useNavigate();

  const  navigateTo$ = $((link: string) => {
    nav.path =link;
  })

  // temp method.
  const placeOrder = $(() => {
    // clear cart for v.1 test
    cart.cartItems = {}
    nav.path = "/menu"
  })
  const getCartTotal = (cartItem: CartItem) => {
    return (
      cartItem.count * (parseInt(cartItem.product.price.toString()) +
      cartItem.modifiers!.reduce(
        (total, curr) => total + parseInt(curr!.price!.toString()),
        0
      ))
    );
  };

  const productCountChange$ = $((cartItemKey: string, delta: number) => {
    console.log("key passed", cartItemKey);
    if (cart.cartItems[cartItemKey].count + delta <= 0) {
      const newCartItems: { [key: string]: CartItem } = {};
      Object.keys(cart.cartItems)
        .filter((item) => item !== cartItemKey)
        .map((key) => (newCartItems[key] = cart.cartItems[key]));

      cart.cartItems = newCartItems;
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
      //   cart.cartItems[cartItemKey].count =  cart.cartItems[cartItemKey].count  +delta;
    }
  });
  return (
    <>
     <div>
     <div class=" h-screen">
        <div class="w-full h-14 flex flex-row bg-white pt-2 mb-1 sticky top-0">
          <button class="w-14"
          onClick$={() => navigateTo$('/menu') }
          ><svg class="w-10" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512"  xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 "/>
            </svg>
          </button>
          <div class="flex flex-col">
            <div class=" text-lg">Table 22</div>
            <div class="font-thin text-sm">{Object.keys(cart.cartItems).length} Items | Estimated Time 30m</div>
          </div>
        </div>
        {Object.values(cart.cartItems).map((cartItem, cartIndex)  => (
          <div class=" px-4 bg-white">
            <div class=" border-b  flex flex-row py-2 ">
              <div class=" flex-grow ">
                <div class="text-sm"> {cartItem.product.name}</div>
                <div class="text-xs font-thin">
                  
                {cartItem.modifiers?.map(
                    (modifier) => modifier.description + ", "
                  )}
                </div>
              </div>

              <div class="flex flex-row justify-center items-center">
                <div class=" w-full mr-1 h-6 flex flex-row justify-between items-center text-xs font-bold  bg-gray-200 p-1 rounded-lg basis-0">
                  <button class="w-4 h-4 font-bold text-lg flex justify-center items-center"
                onClick$={ () => productCountChange$(Object.keys(cart.cartItems)[cartIndex], -1 )}
                  >
                    -
                  </button>
                  <div class="px-2 flex-grow text-center text-sm">{cartItem.count}</div>
                  <button
                    class="w-4 h-4  font-bold text-lg  flex justify-center items-center"
                    onClick$={ () => productCountChange$(Object.keys(cart.cartItems)[cartIndex], 1 )}
                  >
                    +
                  </button>
                </div>
                <div class="w-16 text-sm font-light text-right">
                {getCartTotal(cartItem)} $
                </div>
              </div>
            </div>
          </div>
        ))}

        <div class="mt-2 bg-white px-4">
          <textarea class="w-full py-2  font-thin" name="" id="" placeholder="Would you like to tell us about something"></textarea>

        </div>
        <div class="w-full bg-white px-4 pt-2 mt-2">
          <div class="text-sm font-semibold">Bill Details</div>
         
            <div class="flex flex-row font-light text-sm py-2">
              <div class="flex-grow">Item Total</div>
              <div class="text-right">{cart.total} $</div>
            </div>
            <div class="flex flex-row font-light text-sm py-2 border-b">
              <div class="flex-grow">Govermnet charges</div>
              <div class="text-right">12,00 $</div>
            </div>
      
          <div class="flex flex-row font-bold text-sm py-2">
              <div class="flex-grow">To Pay</div>
              <div class="text-right">{cart.taxedTotal } $</div>
            </div>
        </div>
      </div>
      <div class="w-screen px-4 fixed bottom-1  text-center">
        <div class=" p-4 py2 bg-gray-800 rounded text-white font-bold "><button onClick$={placeOrder}>PLACE ORDER
          </button></div>

      </div>
     </div>
     <div>

     </div>
    </>
  );
});

// <div class="w-full p-2 sm:w-1/2 bg-white mx-auto">
// <div>{JSON.stringify(cart.createdAt)}</div>
// <section class="font-thin text-xl">Table 22</section>
// <section class="border-t mt-2">
// <table class="table-auto">
//     <thead>
//       <tr>
//         <th>Product</th>
//         <th>Unit</th>
//         <th>Total</th>
//       </tr>
//     </thead>
//     <tbody>
//       {Object.values(cart.cartItems).map((cartItem, cartIndex) => {
//         return (
//           <tr class="">
//             <td class="w-full">
//               <div class="p-2">
//                 {cartItem.product.name}
//                 <br />
//                 <span class="font-thin text-sm">
//                   {cartItem.modifiers?.map(
//                     (modifier) => modifier.description + ", "
//                   )}
//                 </span>
//               </div>
//             </td>
//             <td class="w-12 text-xs p-2">
//               <div>
//                 <div>
//                   <span class="font-thin mr-1 text-lg">
//                     {cartItem.count}x
//                   </span>
//                   {getCartTotal(cartItem)}
//                 </div>
//                 <div class="flex flex-row justify-between gap-1 ">
//                   <button
//                     class="w-5 h-5 rounded-full bg-fuchsia-500 hover:bg-fuchsia-300"
//                     onClick$={ () =>
//                       productCountChange$(
//                         Object.keys(cart.cartItems)[cartIndex],
//                         -1
//                       )
//                     }
//                   >
//                     +
//                   </button>
//                   <button
//                     class="w-5 h-5 rounded-full bg-green-500 hover:bg-green-400"
//                     onClick$={() =>
//                       productCountChange$(
//                         Object.keys(cart.cartItems)[cartIndex],
//                         1
//                       )
//                     }
//                   >
//                     -
//                   </button>
//                 </div>
//               </div>
//             </td>
//             <td class="w-4 py-2">
//               {getCartTotal(cartItem) * cartItem.count}
//             </td>
//           </tr>
//         );
//       })}
//     </tbody>
//   </table>
//   <div class="flex flex-row border-t-2 py-3 font-bold">
//     <div class="flex-grow"></div>
//     <div class="w-1/4 font-thin">Total: </div>
//     <div class="w-1/4 text-right font-semibold">{cart.total}</div>
//   </div>
//   {cart.taxesApplied?.map((taxApplied) => {
//     return (
//       <div class="flex flex-row justify-end  py-3 font-bold">
//         <div class="flex-grow"></div>
//         <div class="w-1/4 font-thin">{taxApplied.name} </div>
//         <div class="w-1/4 text-right font-semibold">
//           {taxApplied.taxValue}
//         </div>
//       </div>
//     );
//   })}

//   <div class="flex flex-row border-t-2 py-3 font-bold">
//     <div class="flex-grow"></div>
//     <div class="w-1/4">Gross: </div>
//     <div class="w-1/4 text-right">{cart.taxedTotal }</div>
//   </div>
//   <div class="py-2 h-32">
//     <label for="story" class=" font-thin">
//       Tell us your story:
//     </label>

//     <textarea
//       id="story"
//       name="story"
//       rows="3"
//       class="w-full outline outline-1 mt-3"
//     ></textarea>
//   </div>
//   <button class="bg-gray-900 text-white rounded-full text-center p-2 w-full">
//     Place Order
//   </button>
//   <br />
//   <div class="bg-gray-900 text-white rounded-full text-center p-2 w-full">
//     spinner
//   </div>

//   {Object.values(cart.cartItems).map((cartItem: CartItem) => {
//     return (
//       <div>
//         <div>{cartItem.product.name}</div>

//         {cartItem.modifiers?.map((modifier) => (
//           <div class="font-thin">{modifier.description}</div>
//         ))}
//       </div>
//     );
//   })} */
// </section>
// </div>
