import { checkDataHasMessage, checkErrorHasStatus } from './validation';

export const getErrorMessage = (error: unknown) => {
    if (!checkErrorHasStatus(error)) {
        return 'Something went wrong, please try again later';
    }

    const { status, data } = error.response;

    switch (status) {
        case 401:
            return 'Please login before perform this action';

        case 403:
            return 'You are not authorized to perform this action';

        case 408:
            return 'Request timeout';

        case 413:
            return 'Sent data reached our limits';

        case 415:
            return 'The media format is not supported by the server';

        case 422:
            if (!checkDataHasMessage(data)) {
                return 'Something went wrong, please try again later';
            }

            return data.message;

        case 429:
            return 'You sent too many requests in a given amount of time';

        default:
            return 'Something went wrong, please try again later';
    }
};
