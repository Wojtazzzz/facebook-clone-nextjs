export const getStoredImagePath = (path: string) => {
    if (!path.startsWith('http') && !path.startsWith('blob:')) {
        return `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${path}`;
    }

    return path;
};
