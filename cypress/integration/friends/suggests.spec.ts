const TEST_EMAIL = Cypress.env('test_email');
const TEST_PASSWORD = Cypress.env('test_password');

describe('Suggests friends', () => {
	beforeEach(() => {
		cy.loginAndWaitForRequests(TEST_EMAIL, TEST_PASSWORD);

		cy.get('aside > a[title="Friends"]').click();
		cy.get('nav > a[href*="/friends/suggests"]').contains('Suggests').click();
	});

	it('send invite to user', () => {
		cy.clickButtonAndExpectMessage('Invite', 'Request sent successfully', 'invite', 200);
	});

	it('cannot send invite to user', () => {
		cy.clickButtonAndExpectMessage('Invite', 'Something went wrong', 'invite', 422);
	});
});

export {};
