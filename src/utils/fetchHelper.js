// "use server";

export const fetchWithAuth = async (url) => {
	try {
		const response = await fetch(url, {
			cache: "force-cache",
			method: "GET",
			headers: {
				Authorization: "Basic " + btoa(`Abhinay:mobiles@32`),
			},
		});

		if (!response.ok) {
			throw new Error(
				`Failed to fetch from ${url}. Status: ${response.status}`
			);
		}

		return await response.json();
	} catch (error) {
		console.error(error);
		throw error;
	}
};
