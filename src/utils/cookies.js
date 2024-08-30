import Cookie from "js-cookie";

export function getCookie(name) {
	const value = Cookie.get(name);
	try {
		return value ? JSON.parse(value) : [];
	} catch (error) {
		console.error(`Failed to parse cookie "${name}":`, error);
		return [];
	}
}

export function setCookie(name, value, days) {
	Cookie.set(name, JSON.stringify(value), { expires: days });
}

export function updateCookieWithSlug(cookieName, slug) {
	const existingValue = getCookie(cookieName);
    console.log(existingValue);
	const slugArray = Array.isArray(existingValue) ? existingValue : [];

	if (!slugArray.includes(slug)) {
		slugArray.push(slug);
	}

	setCookie(cookieName, slugArray, 7); // Store for 7 days
}
