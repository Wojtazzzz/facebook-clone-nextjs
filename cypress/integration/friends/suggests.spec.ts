const BASE_URL = Cypress.env('base_url');
const BACKEND_URL = Cypress.env('backend_url');

const TEST_EMAIL = Cypress.env('test_email');
const TEST_PASSWORD = Cypress.env('test_password');

describe('Suggests friends', () => {
	beforeEach(() => {
		cy.request(`${BACKEND_URL}/api/tests`).then(interception => {
			expect(interception.isOkStatusCode);
		});

		cy.loginAndWaitForRequests(TEST_EMAIL, TEST_PASSWORD);
	});

	after(() => {
		cy.request(`${BACKEND_URL}/api/tests`).then(interception => {
			expect(interception.isOkStatusCode);
		});
	});

	it('invite test user and he disappear from suggests list', () => {
		cy.get('aside > a[title="Friends"]').click();
		cy.get('nav > a[href*="/friends/suggests"]').contains('Suggests').click();
		cy.get('a[href*="/profile/3"]')
			.within(() => {
				cy.get('div[class="ml-auto"] > button').contains('Invite').click();
			})
			.contains('Invitation sended');

		cy.visit(`${BASE_URL}/friends/suggests`);
		cy.get('a[href*="/profile/3"]').should('not.exist');
	});

	it('cannot invite test user and he not disappear from suggests list', () => {
		cy.intercept('POST', `${BACKEND_URL}/api/invite`, { statusCode: 422 });

		cy.get('aside > a[title="Friends"]').click();
		cy.get('nav > a[href*="/friends/suggests"]').contains('Suggests').click();
		cy.get('a[href*="/profile/3"]')
			.within(() => {
				cy.get('div[class="ml-auto"] > button').contains('Invite').click();
			})
			.contains('Something went wrong');

		cy.visit(`${BASE_URL}/friends/suggests`);
		cy.get('a[href*="/profile/3"]');
	});
});

export {};
