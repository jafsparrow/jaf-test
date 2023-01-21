import type { Signal } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import type { SelectedProductStore } from "~/routes/menu";
import type { Product } from "~/types";
import { MenuItem } from "../menu-item/menuItem";

export type SubMenuProps = {
  title: string;
  products: Product[];
  showDialogStore: Signal<boolean>;
  selectedProductStore: SelectedProductStore

};

export const SubMenu = component$<SubMenuProps>((subMenu) => {
  const { title, products, showDialogStore, selectedProductStore } = subMenu;



  return (
    <>
      <div class="w-full bg-white mt-2 ">
        <div class="pl-4 py-2 text-lg font-normal  ">{title}</div>
        <div class=" flex flex-col gap-1  sm:gap-0  sm:flex-row sm:flex-wrap w-full">
          {products.map((product) => {
         
             return  <MenuItem  showDialogStore={showDialogStore} selectedProductStore={selectedProductStore} product={product}/>
          })}
        </div>
      </div>
    </>
  );
});
