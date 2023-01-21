import { component$, QRL, Slot } from "@builder.io/qwik";

interface ModalProps {
  onClose: QRL<() => void>;
}

export const Dialog = component$<ModalProps>((props) => {


  return (
    <>
      {" "}
      <div class="fixed top-0 left-0 z-10 w-full  bg-black bg-opacity-40 ">
        <div class="bg-gray-100">
          {/* <button onClick$={ props.onClose} class="absolute right-1 top-1 p-2 bg-gray-500 font-semibold text-sm mb-36">X</button> */}
        
          <Slot></Slot>
        </div>
      </div>
    </>
  );
});
