const BASE_URL = Cypress.env('base_url');
const BACKEND_URL = Cypress.env('backend_url');

const TEST_EMAIL = Cypress.env('test_email');
const TEST_PASSWORD = Cypress.env('test_password');

describe('Chat', () => {
	beforeEach(() => {
		cy.request(`${BACKEND_URL}/api/tests`).then(interception => {
			expect(interception.isOkStatusCode);
		});

		cy.loginAndWaitForRequests(TEST_EMAIL, TEST_PASSWORD);
	});

	it('open chat and send message', () => {
		cy.get('aside[data-testid="contacts"]').first().click();
		cy.get('div[data-testid="chat"]').should('contain.text', 'Say hello to your friend!');

		cy.get('div[data-testid="chat-panel"]').within(() => {
			cy.get('input[name="text"]').type('Hello World!{enter}');
		});

		cy.get('div[data-testid="chat-messages"]').should('contain.text', 'Hello World!');
	});
});

export {};
