import { BACKEND_URL } from './env';

export const getStoredImagePath = (path: string) => {
    if (!path.startsWith('http') && !path.startsWith('blob:')) {
        return `${BACKEND_URL}/storage/${path}`;
    }

    return path;
};
