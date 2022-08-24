import * as Formik from 'formik';

export const mockFormikContext = () => {
    const useFormikContextMock = jest.spyOn(Formik, 'useFormikContext');

    useFormikContextMock.mockReturnValue({
        getFieldMeta: {
            value: 'testValue',
            initialTouched: true,
            touched: false,
        },
    } as any);
};
