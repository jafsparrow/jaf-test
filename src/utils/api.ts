import { isBrowser } from "@builder.io/qwik/build";
import { AUTH_TOKEN, VENDURE_PUBLIC_URL } from "~/constants";
import { CategoryViseProducts, Product } from "~/types";
import { getCookie, setCookie } from ".";
import { products } from "./seed_data";

export const execute = async <T>(body: {
  query: string;
  variables: Record<string, any>;
}): Promise<T> => {
  let headers: Record<string, string> = { "Content-Type": "application/json" };
  if (isBrowser) {
    const token = getCookie(AUTH_TOKEN);
    headers = { ...headers, Authorization: `Bearer ${token}` };
  }
  const options = {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  };

  const response = await fetch(VENDURE_PUBLIC_URL, options);
  if (isBrowser) {
    const responsetoken = response.headers.get("vendure-auth-token");
    if (responsetoken) {
      setCookie(AUTH_TOKEN, responsetoken, 365);
    }
  }
  const json: any = await response.json();
  return json.data;
};

const fetchTMDB = async <T = unknown>(
  path: string,
  search: Record<string, string> = {}
): Promise<T> => {
  const params = new URLSearchParams({
    ...search,
    api_key: "1587060c9bf668b37c21a5f5e55bfb90",
  });
  const url = `${VENDURE_PUBLIC_URL}/${path}`;

  const response = await fetch(url);

  if (!response.ok) {
    // eslint-disable-next-line no-console
    console.error(url);
    throw new Error(response.statusText);
  }

  return response.json() as T;
};

type GetTrendingTv = {
  page: number;
};

export const getProducts = (path: string) => {
	return Promise.resolve(products)

 // return fetchTMDB<CategoryViseProducts>(`products/list`, {});
};
