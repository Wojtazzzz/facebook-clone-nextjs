export const checkFilesAreTooBig = (files: unknown) => {
    if (!files || !Array.isArray(files)) {
        return false;
    }

    files.forEach((file) => {
        const size = file.size / 1024 / 1024;

        if (size > 10) {
            return false;
        }
    });

    return true;
};
