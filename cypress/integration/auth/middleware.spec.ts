const BASE_URL = Cypress.env('base_url');

const TEST_EMAIL = Cypress.env('test_email');
const TEST_PASSWORD = Cypress.env('test_password');

describe("Are middleware's redirects correctly", () => {
	it('Redirect from UserLayout to GuestLayout as not logged user', () => {
		cy.visit('/');

		cy.url().should('eq', `${BASE_URL}/login`);
	});

	it('Redirect from GuestLayout to UserLayout as logged user', () => {
		cy.loginAndWaitForRequests(TEST_EMAIL, TEST_PASSWORD);

		cy.visit('/login');

		cy.url().should('eq', `${BASE_URL}/`);
	});
});

export {};
