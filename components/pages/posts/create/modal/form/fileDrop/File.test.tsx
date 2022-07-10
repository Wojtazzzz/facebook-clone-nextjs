import { screen } from '@testing-library/react';
import { renderWithDefaultData } from '@utils/renderWithDefaultData';
import { File as FileComponent } from '@components/pages/posts/create/modal/form/fileDrop/File';
import * as Formik from 'formik';
import { generateFile } from '@utils/generateFile';

describe('File component', () => {
    const useFormikContextMock = jest.spyOn(Formik, 'useFormikContext');

    beforeEach(() => {
        useFormikContextMock.mockReturnValue({
            getFieldMeta: {
                value: 'testValue',
                initialTouched: true,
                touched: false,
            },
        } as any);
    });

    it('display file name', () => {
        const file = generateFile('testImage.png', 'image/png');

        renderWithDefaultData(<FileComponent file={file} />);

        const name = screen.getByText('testImage.png');

        expect(name).toBeInTheDocument();
    });
});
