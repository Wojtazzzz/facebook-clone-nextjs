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

	it('invite test user', () => {
		cy.get('aside > a[title="Friends"]').click();
		cy.get('nav > a[href*="/friends/suggests"]').contains('Suggests').click();
		cy.get('a[href*="/profile/3"]')
			.within(() => {
				cy.get('div[class="ml-auto"] > button').contains('Invite').click();
			})
			.contains('Invitation sended');
	});

	it('cannot invite test user', () => {
		cy.intercept('POST', `${BACKEND_URL}/api/invite`, { statusCode: 422 });

		cy.get('aside > a[title="Friends"]').click();
		cy.get('nav > a[href*="/friends/suggests"]').contains('Suggests').click();
		cy.get('a[href*="/profile/3"]')
			.within(() => {
				cy.get('div[class="ml-auto"] > button').contains('Invite').click();
			})
			.contains('Something went wrong');
	});
});

export {};
