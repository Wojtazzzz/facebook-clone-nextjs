import { Contacts } from '@components/contacts/Contacts';
import { store } from '@redux/store';
import { render } from '@testing-library/react';
import axios from 'axios';
import { Provider } from 'react-redux';
import ContactsFirstPageResponse from '@mocks/contacts/firstPage.json';
import ContactsSecondPageResponse from '@mocks/contacts/secondPage.json';
import ContactsEmptyResponse from '@mocks/contacts/empty.json';

jest.mock('axios');
const axiosGetSpy = jest.spyOn(axios, 'get');

describe('Contacts', () => {
	afterEach(() => {
		axiosGetSpy.mockClear();
	});

	it('render 10 contacts and fetch 10 more on click', async () => {
		axiosGetSpy.mockImplementation((url: string) => {
			if (url.includes('?page=1')) {
				return Promise.resolve(ContactsFirstPageResponse);
			} else {
				return Promise.resolve(ContactsSecondPageResponse);
			}
		});

		const { container, findByText, getByTestId } = render(
			<Provider store={store}>
				<Contacts />
			</Provider>
		);

		const FirstContact = await findByText('Torrey Purdy');
		expect(FirstContact).toBeInTheDocument();

		const LastContact = await findByText('Sylvester Mraz');
		expect(LastContact).toBeInTheDocument();

		// Check for list has 10 elements (+1 beacause there is one extra element for fetching)
		expect(container.querySelector('div[data-testid="contacts-list"]')?.children.length).toBe(10 + 1);

		getByTestId('contacts-fetch-button').click();

		const FirstNewContact = await findByText('Abbigail Senger');
		expect(FirstNewContact).toBeInTheDocument();

		const LastNewContact = await findByText('Eleanora Rohan');
		expect(LastNewContact).toBeInTheDocument();

		// Check for list has 20 elements (+1 beacause there is one extra element for fetching)
		expect(container.querySelector('div[data-testid="contacts-list"]')?.children.length).toBe(20 + 1);
	});

	it('show empty list component', async () => {
		axiosGetSpy.mockImplementation(() => Promise.resolve(ContactsEmptyResponse));

		const { findByText } = render(
			<Provider store={store}>
				<Contacts />
			</Provider>
		);

		const EmptyListComponent = await findByText('No contacts, add some friends!');
		expect(EmptyListComponent).toBeInTheDocument();
	});
});
