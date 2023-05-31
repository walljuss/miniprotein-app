const extractLink = (respLink) => {
	const startIndex = respLink.indexOf("<");
	const endIndex = respLink.indexOf(">");

	if (startIndex !== -1 && endIndex !== -1) {
		const link = respLink.substring(startIndex + 1, endIndex);
		return link;
	} else {
		return 0;
	}
};

const getData = async (url) => {
	const response = await fetch(url);
	const data = await response.json();
	return data;
};

export { extractLink, getData };
