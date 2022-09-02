import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { screen } from '@testing-library/react';
import { OwnOptions } from './OwnOptions';

describe('OwnOptions component', () => {
    it('render delete option', () => {
        renderWithDefaultData(<OwnOptions commenting={true} postId={1} />);

        const deleteOption = screen.getByLabelText('Delete');

        expect(deleteOption).toBeInTheDocument();
    });

    it('render turnOffCommenting option when commenting is true', () => {
        renderWithDefaultData(<OwnOptions commenting={true} postId={1} />);

        const turnOffCommentingOption = screen.getByLabelText('Turn off comments');
        const turnOnCommentingOption = screen.queryByLabelText('Turn on comments');

        expect(turnOffCommentingOption).toBeInTheDocument();
        expect(turnOnCommentingOption).not.toBeInTheDocument();
    });

    it('render turnOnCommenting option when commenting is false', () => {
        renderWithDefaultData(<OwnOptions commenting={false} postId={1} />);

        const turnOnCommentingOption = screen.getByLabelText('Turn on comments');
        const turnOffCommentingOption = screen.queryByLabelText('Turn off comments');

        expect(turnOnCommentingOption).toBeInTheDocument();
        expect(turnOffCommentingOption).not.toBeInTheDocument();
    });
});
