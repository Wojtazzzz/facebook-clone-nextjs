const BACKEND_URL = Cypress.env('backend_url');

const TEST_EMAIL = Cypress.env('test_email');
const TEST_PASSWORD = Cypress.env('test_password');

describe('Logout process', () => {
	it('Logout', () => {
		cy.loginAndWaitForRequests(TEST_EMAIL, TEST_PASSWORD);

		cy.intercept('POST', `${BACKEND_URL}/logout`).as('logout');

		cy.get('nav').within(() => {
			cy.get('button[aria-label="Log out"]').click();
		});

		cy.wait('@logout').then(interception => {
			expect(interception.response?.statusCode).to.eq(204);
			cy.checkUserRequest('userLogggedOut', 401);
		});
	});
});

export {};
