const TEST_EMAIL = Cypress.env('test_email');
const TEST_PASSWORD = Cypress.env('test_password');

const randomMessage = (Math.random() + 1).toString(36).substring(7);

describe('Chat', () => {
	beforeEach(() => {
		cy.loginAndWaitForRequests(TEST_EMAIL, TEST_PASSWORD);
	});

	it('open chat and send message', () => {
		cy.get('div[data-testid="contacts-list"]').children().first().click();
		cy.get('div[data-testid="chat"]').should('be.visible');

		cy.get('div[data-testid="chat-panel"]').within(() => {
			cy.get('input[name="text"]').type(`${randomMessage}{enter}`);
		});

		cy.wait(10000);
		cy.get('div[data-testid="chat-messages"]').should('contain.text', randomMessage);
	});
});

export {};
