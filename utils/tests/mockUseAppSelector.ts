import JohnDoe from '@mocks/user/johnDoe.json';

export const mockUseAppSelector = () => {
    jest.mock('react-redux', () => ({
        ...jest.requireActual('react-redux'),
        useSelector: jest.fn().mockReturnValueOnce({
            store: {
                chat: {
                    friend: JohnDoe,
                    error: '',
                },
            },
        }),
    }));
};
