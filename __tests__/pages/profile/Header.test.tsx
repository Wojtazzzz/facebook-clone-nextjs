import React from 'react';
import * as useFriends from '@hooks/useFriends';
import * as useAuth from '@hooks/useAuth';
import '@testing-library/jest-dom/extend-expect';

import { render, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { Header } from '@components/pages/profile/Header';

import newUser from '@mocks/user/new.json';
import tenFriends from '@mocks/friends/ten.json';
import zeroFriends from '@mocks/friends/zero.json';

describe('Header', () => {
	beforeEach(() => {
		jest.restoreAllMocks();
		jest.spyOn(useAuth, 'useAuth').mockImplementation(() => newUser);
	});

	it('Check is background image visible', async () => {
		const { getByAltText } = render(<Header user={newUser} />);

		await waitFor(async () => {
			const backgroundImage = getByAltText(`${newUser.first_name} background`);
			expect(backgroundImage).toBeInTheDocument();
		});
	});

	it('Check is profile image visible', async () => {
		const { getByAltText } = render(<Header user={newUser} />);

		await waitFor(async () => {
			const profileImage = getByAltText(`${newUser.first_name} profile image`);
			expect(profileImage).toBeInTheDocument();
		});
	});

	it('Check test account have 0 friends', () => {
		act(() => {
			jest.spyOn(useFriends, 'useFriends').mockImplementation(() => zeroFriends);
		});

		const { getByText } = render(<Header user={newUser} />);
		const text = getByText('0 Friends');

		expect(text).toBeInTheDocument();
	});

	it('Check user account with 10 friends have 10 friends on panel', async () => {
		act(() => {
			jest.spyOn(useFriends, 'useFriends').mockImplementation(() => tenFriends);
		});

		const { findByText } = render(<Header user={newUser} />);

		await waitFor(async () => {
			const text = await findByText('10 Friends');
			expect(text).toBeInTheDocument();
		});
	});
});
