import { screen } from '@testing-library/react';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { File as FileComponent } from '@components/inc/modals/createPost/form/fileDrop/File';
import { generateFile } from '@utils/tests/generateFile';
import { mockFormikContext } from '@utils/tests/mockFormikContext';

describe('File component', () => {
    beforeEach(() => {
        mockFormikContext();
    });

    it('display file name', () => {
        const file = generateFile('testImage.png', 'image/png');

        renderWithDefaultData(<FileComponent file={file} />);

        const name = screen.getByText('testImage.png');

        expect(name).toBeInTheDocument();
    });
});
