import { render, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';

import { Header } from '@components/pages/profile/Header';

import newUser from '../../../__mocks__/user/new.json';
import userWithThreeFriends from '../../../__mocks__/user/withThreeFriends.json';
import React from 'react';


describe('Header', () => {
    beforeEach(() => {
        jest.resetAllMocks();

        jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({
            data: () => Promise.resolve(newUser)
        }));
    });

    it('Check is background image visible', () => {
        const { getByAltText } = render(<Header user={newUser} />);

        const backgroundImage = getByAltText(`${newUser.first_name} background`);

        expect(backgroundImage).toBeInTheDocument();
    });

    it('Check is profile image visible', () => {
        const { getByAltText } = render(<Header user={newUser} />);

        const profileImage = getByAltText(`${newUser.first_name} profile image`);

        expect(profileImage).toBeInTheDocument();
    });

    it('Check test account have 0 friends', () => {
        const { getByText } = render(<Header user={newUser} />);

        const text = getByText('0 Friends');

        expect(text).toBeInTheDocument();
    });

    it('Check user account with three friends have 3 friends on panel', () => {
        const { getByText } = render(<Header user={userWithThreeFriends} />);

        const text = getByText('3 Friends');

        expect(text).toBeInTheDocument();
    });
});