import { SUPPORTED_FORMATS } from '@utils/supportedImagesFormats';

export const checkFilesHaveCorrectType = (files: unknown) => {
    if (!files || !Array.isArray(files)) {
        return false;
    }

    files.forEach((file) => {
        if (!SUPPORTED_FORMATS.includes(file.type)) {
            return false;
        }
    });

    return true;
};
