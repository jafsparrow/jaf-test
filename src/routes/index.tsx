import { component$, useContext, useResource$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Link } from "@builder.io/qwik-city";
import { APP_STATE } from "~/constants";

export default component$(() => {
  useResource$(async () => {
    // const posts = await fetch('https://gorest.co.in/public/v2/posts');
    // console.log(posts.)
  });


  const cartCountFromContext = useContext(APP_STATE)
  return (
    <div class="container  mx-auto bg-gray-800  w-full h-48">
      <div class=" ml-20 mr-48 border  border-t-0">
        <Link href="flower">flower</Link>
        
      <button onClick$={() => cartCountFromContext.cartCount ++}>increase</button>
        <div class="relative bg-cover">
          <span class="absolute top-0 left-0 ml-6 mt-6 cursor-pointer">
            <svg
              class="h-6 w-6"
              viewbox="0 0 2048 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1024 672q119 0 203.5 84.5t84.5 203.5-84.5 203.5-203.5 84.5-203.5-84.5-84.5-203.5 84.5-203.5 203.5-84.5zm704-416q106 0 181 75t75 181v896q0 106-75 181t-181 75h-1408q-106 0-181-75t-75-181v-896q0-106 75-181t181-75h224l51-136q19-49 69.5-84.5t103.5-35.5h512q53 0 103.5 35.5t69.5 84.5l51 136h224zm-704 1152q185 0 316.5-131.5t131.5-316.5-131.5-316.5-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5z"
                fill="#fff"
              ></path>
            </svg>
          </span>

          <img
            alt="cover"
            class="object-contain"
            src="https://s3.amazonaws.com/99Covers-Facebook-Covers/watermark/13762.jpg"
          ></img>

          <span class="absolute bottom-0 right-0 mb-6 mr-4">
            <span class="bg-white border p-1 text-grey-darkest cursor-pointer text-sm rounded">
              <svg
                class="h-4 w-4"
                viewbox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z"></path>
              </svg>
              <span class="mr-2">Edit Profile</span>
            </span>
            <span class="bg-white border p-1 text-grey-darkest ml-4 cursor-pointer text-sm rounded">
              <span class="border-r pr-2">View Activity Log</span>
              <svg
                class="w-4 h-4"
                viewbox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M576 736v192q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h192q40 0 68 28t28 68zm512 0v192q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h192q40 0 68 28t28 68zm512 0v192q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h192q40 0 68 28t28 68z"></path>
              </svg>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
