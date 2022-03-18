import { render } from '@testing-library/react';
import mockAxios from 'jest-mock-axios';
import { NotificationsList } from '@components/nav/additions/notifications/NotificationsList';
import axios from 'axios';
import { Provider } from 'react-redux';
import { store } from '@redux/store';
import NotificationsFirstPageResponse from '@mocks/notifications/firstPage.json';

jest.mock('axios');

describe('Notifications list in dropdown', () => {
	afterEach(() => {
		mockAxios.reset();
	});

	it('show first and last notification on list', async () => {
		axios.get.mockResolvedValue(NotificationsFirstPageResponse);

		const { findByText } = render(
			<Provider store={store}>
				<NotificationsList />
			</Provider>
		);

		const FirstNotification = await findByText('Jeramy Marks');
		expect(FirstNotification).toBeInTheDocument();

		const LastNotification = await findByText('Lily Conn');
		expect(LastNotification).toBeInTheDocument();
	});
});
