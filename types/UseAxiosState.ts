type data<T> = {
    data: T;
    message: string;
};

export type UseAxiosState<T> =
    | { status: 'EMPTY' }
    | { status: 'LOADING' }
    | { status: 'ERROR'; error: Error }
    | { status: 'SUCCESS'; data: data<T> };
