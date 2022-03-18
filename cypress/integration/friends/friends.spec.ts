const TEST_EMAIL = Cypress.env('test_email');
const TEST_PASSWORD = Cypress.env('test_password');

describe('List of friends', () => {
	beforeEach(() => {
		cy.loginAndWaitForRequests(TEST_EMAIL, TEST_PASSWORD);
		cy.get('aside > a[title="Friends"]').click();
	});

	it('remove friend from friends', () => {
		cy.clickButtonAndExpectMessage('Remove', 'Friendship destroyed', 'friendship/destroy', 200);
	});

	it('cannot remove friend from friends', () => {
		cy.clickButtonAndExpectMessage('Remove', 'Something went wrong', 'friendship/destroy', 422);
	});
});

export {};
