import { screen } from '@testing-library/react';
import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { Image as ImageComponent } from './Image';
import { generateFile } from '@utils/tests/generateFile';
import { mockFormikContext } from '@utils/tests/mockFormikContext';

describe('Image component tests', () => {
    beforeEach(() => {
        mockFormikContext();
    });

    it('display file name', () => {
        const img = generateFile('testImage.png', 'image/png');

        renderWithDefaultData(<ImageComponent image={img} />);

        const name = screen.getByText('testImage.png');

        expect(name).toBeInTheDocument();
    });
});
