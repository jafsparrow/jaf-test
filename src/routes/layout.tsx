import {
  $,
  component$,
  Slot,
  useContextProvider,
  useStore,
  useTask$,
  useWatch$,
} from "@builder.io/qwik";
import Header from "~/components/header/header";
import { APP_STATE, CartStoreState, CART_STATE } from "~/constants";
import type { AppState, CartItem, CartState, Tax } from "~/types";



export default component$(() => {
 
  return (
    <>
      <main>
        {/* <Header /> */}
        {/* <div>{JSON.stringify(cartStore)}</div> */}
        <section>
          <Slot />
        </section>
      </main>
      {/* <footer>
        <a href="https://www.builder.io/" target="_blank">
          Made with ♡ by Builder.io
        </a>
      </footer> */}
    </>
  );
});
