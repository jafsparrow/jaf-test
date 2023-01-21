import { isBrowser } from '@builder.io/qwik/build';

export const getRandomInt = (max: number) => Math.floor(Math.random() * max);
export function formatPrice(value: number, currency: any) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
	}).format(value / 100);
}


export const changeUrlParamsWithoutRefresh = (term: string, facetValueIds: string[]) =>
	window.history.pushState(
		'',
		'',
		`${window.location.origin}${window.location.pathname}?q=${term}&f=${facetValueIds.join('-')}`
	);

export const scrollToTop = () => {
	if (isBrowser) {
		window.scrollTo(0, 0);
	}
};

export const setCookie = (name: string, value: string, days: number) => {
	let expires = '';
	if (days) {
		const date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = '; expires=' + date.toUTCString();
	}
	document.cookie = name + '=' + (value || '') + expires + '; Secure; SameSite=Strict; path=/';
};

export const getCookie = (name: string) => {
	const keyValues = document.cookie.split(';');
	let result = null;
	keyValues.forEach((item) => {
		const [key, value] = item.split('=');
		if (key.trim() === name) {
			result = value;
		}
	});
	return result;
};

export const cleanUpParams = (params: Record<string, string>) => {
	if ('slug' in params && params.slug[params.slug.length - 1] === '/') {
		params.slug = params.slug.slice(0, params.slug.length - 1);
	}
	return params;
};
