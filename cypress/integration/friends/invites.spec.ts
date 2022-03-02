const BASE_URL = Cypress.env('base_url');
const BACKEND_URL = Cypress.env('backend_url');

const TEST_EMAIL = Cypress.env('test_email');
const TEST_PASSWORD = Cypress.env('test_password');

Cypress.Commands.add('clickButtonAndExpectMessage', (buttonTitle, message, route, statusCode) => {
	if (statusCode === 422) {
		cy.intercept('POST', `${BACKEND_URL}/api/${route}`, { statusCode });
	}

	cy.get('aside > a[title="Friends"]').click();
	cy.get('nav > a[href*="/friends/invites"]').contains('Invites').click();
	cy.get('a[href*="/profile/4"]')
		.within(() => {
			cy.get('div[class="ml-auto"] > div[class="flex gap-3"] > button').contains(buttonTitle).click();
		})
		.contains(message);
});

describe('Invites friends', () => {
	beforeEach(() => {
		cy.request(`${BACKEND_URL}/api/tests`).then(interception => {
			expect(interception.isOkStatusCode);
		});

		cy.loginAndWaitForRequests(TEST_EMAIL, TEST_PASSWORD);
	});

	it('accept test user to friends and he shows on friends list', () => {
		cy.clickButtonAndExpectMessage('Accept', 'Invitation accepted', 'accept', 200);

		cy.visit(`${BASE_URL}/friends`);
		cy.get('a[href*="/profile/4"]');
	});

	it('cannot accept test user to friends and he not shows on friends list', () => {
		cy.clickButtonAndExpectMessage('Accept', 'Something went wrong', 'accept', 422);

		cy.visit(`${BASE_URL}/friends`);
		cy.get('a[href*="/profile/4"]').should('not.exist');
	});

	it("reject test user's invitation and he disappear from invites list", () => {
		cy.clickButtonAndExpectMessage('Reject', 'Invitation rejected', 'reject', 200);

		cy.visit(`${BASE_URL}/friends/invites`);
		cy.get('a[href*="/profile/4"]').should('not.exist');
	});

	it("cannot reject test user's invitation and he not disappear from invites list", () => {
		cy.clickButtonAndExpectMessage('Reject', 'Something went wrong', 'reject', 422);

		cy.visit(`${BASE_URL}/friends/invites`);
		cy.get('a[href*="/profile/4"]');
	});
});

export {};
