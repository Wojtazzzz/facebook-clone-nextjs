export const mockUseRouter = () => {
    const useRouter = jest.spyOn(require('next/router'), 'useRouter');

    useRouter.mockReturnValue({
        route: '/',
        pathname: '/',
        query: '',
        asPath: '/',
        prefetch: () => ({
            catch: jest.fn(),
        }),
        push: jest.fn(),
    });
};
