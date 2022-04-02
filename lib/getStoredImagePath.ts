export const getStoredImagePath = (path: string) => {	if (!path.startsWith('http')) {
		return `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${path}`;
	}

	return path;
};
