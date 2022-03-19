const BACKEND_URL = Cypress.env('backend_url');
const TEST_EMAIL = Cypress.env('test_email');
const TEST_PASSWORD = Cypress.env('test_password');

describe('Chat', () => {
	beforeEach(() => {
		cy.loginAndWaitForRequests(TEST_EMAIL, TEST_PASSWORD);
	});

	// it('open chat and send message', () => {
	// 	cy.get('div[data-testid="contacts-list"]').children().first().click();
	// 	cy.get('div[data-testid="chat"]').should('be.visible');
	// });

	it('check loading messages on scrolling', () => {
		cy.intercept(`${BACKEND_URL}/api/messages/*`, { fixture: 'messages/firstPage.json' });

		cy.get('div[data-testid="contacts-list"]').children().first().click();

		// Check first and last message are showing
		cy.get('div[data-testid="chat-messages"]').should('contain.text', 'Ab placeat suscipit.');
		cy.get('div[data-testid="chat-messages"]').should('contain.text', 'Laborum saepe ut.');

		cy.intercept(`${BACKEND_URL}/api/messages/*`, { fixture: 'messages/secondPage.json' }).as('loadingMore');

		// Scroll to top
		cy.get('[data-testid="chat-messages"]')
			.children()
			.first()
			.children()
			.first()
			.scrollTo('top');

		// Check first and last message (from second load) are showing
		cy.wait('@loadingMore').then(() => {
			cy.get('div[data-testid="chat-messages"]').should('contain.text', 'Quaerat architecto.');
			cy.get('div[data-testid="chat-messages"]').should('contain.text', 'Commodi officiis.');
		});
	});
});

export {};
