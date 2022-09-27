import { renderWithDefaultData } from '@utils/tests/renderWithDefaultData';
import { AsideInfo } from './AsideInfo';
import RootUserJson from '@mocks/user/root.json';
import { screen } from '@testing-library/react';

describe('AsideInfo tests', () => {
    it('render Intro and Friends sections', () => {
        renderWithDefaultData(<AsideInfo user={RootUserJson} />);

        const introSection = screen.getByTestId('asideInfo-intro');
        const friendsSection = screen.getByTestId('asideInfo-friends');

        expect(introSection).toBeInTheDocument();
        expect(friendsSection).toBeInTheDocument();
    });
});
