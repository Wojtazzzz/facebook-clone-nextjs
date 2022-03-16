const BASE_URL = Cypress.env('base_url');

const TEST_EMAIL = Cypress.env('test_email');
const TEST_PASSWORD = Cypress.env('test_password');

describe('Login', () => {
	it('Login to existing account', () => {
		cy.loginAndWaitForRequests(TEST_EMAIL, TEST_PASSWORD);

		cy.url().should('eq', `${BASE_URL}/`);
	});

	it('Login to not existing account', () => {
		cy.loginAndWaitForRequests(TEST_EMAIL, 'qwerty', 422);

		cy.url().should('eq', `${BASE_URL}/login`);
	});
});

export {};
