const TEST_EMAIL = Cypress.env('test_email');
const TEST_PASSWORD = Cypress.env('test_password');

describe('Poke friend', () => {
	beforeEach(() => {
		cy.loginAndWaitForRequests(TEST_EMAIL, TEST_PASSWORD);
		cy.get('aside > a[title="Pokes"]').click();
	});

	it('Poke user back', () => {
		cy.clickButtonAndExpectMessage('Poke back', 'Friend poked back', 'pokes/*', 201);
	});

	it('Cannot poke user back', () => {
		cy.clickButtonAndExpectMessage('Poke back', 'Something went wrong', 'pokes/*', 422);
	});
});

export {};
