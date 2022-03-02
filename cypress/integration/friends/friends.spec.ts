const BASE_URL = Cypress.env('base_url');
const BACKEND_URL = Cypress.env('backend_url');

const TEST_EMAIL = Cypress.env('test_email');
const TEST_PASSWORD = Cypress.env('test_password');

describe('List of friends', () => {
	beforeEach(() => {
		cy.request(`${BACKEND_URL}/api/tests`).then(interception => {
			expect(interception.isOkStatusCode);
		});

		cy.loginAndWaitForRequests(TEST_EMAIL, TEST_PASSWORD);
	});
    
	it('remove test friend from friends and he disappear from friends', () => {
		cy.get('aside > a[title="Friends"]').click();
		cy.get('a[href*="/profile/2"]')
			.within(() => {
				cy.get('div[class="ml-auto"] > div[class="flex gap-3"] > button').contains('Remove').click();
			})
			.contains('Friend removed');

		cy.visit(`${BASE_URL}/friends`);
		cy.get('a[href*="/profile/2"]').should('not.exist');
	});

	it('cannot remove test friend from friends and he not disappear from friends', () => {
		cy.intercept('POST', `${BACKEND_URL}/api/destroy`, { statusCode: 422 });

		cy.get('aside > a[title="Friends"]').click();
		cy.get('a[href*="/profile/2"]')
			.within(() => {
				cy.get('div[class="ml-auto"] > div[class="flex gap-3"] > button').contains('Remove').click();
			})
			.contains('Something went wrong');

		cy.visit(`${BASE_URL}/friends`);
		cy.get('a[href*="/profile/2"]');
	});
});

export {};
