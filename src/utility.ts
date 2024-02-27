export const utilityGetCachedEmail = () => {
	return localStorage.getItem("email") || "";
};

export const utilityGetCachedUsers = () => {
	return JSON.parse(localStorage.getItem("users") || "{}");
};
