type data = {
    data: [];
    message: string;
};

export type UseAxiosState =
    | { status: 'EMPTY' }
    | { status: 'LOADING' }
    | { status: 'ERROR'; error: Error }
    | { status: 'SUCCESS'; data: data };
