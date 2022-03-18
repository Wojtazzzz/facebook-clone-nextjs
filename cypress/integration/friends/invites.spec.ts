const TEST_EMAIL = Cypress.env('test_email');
const TEST_PASSWORD = Cypress.env('test_password');

describe('Invites friends', () => {
	beforeEach(() => {
		cy.loginAndWaitForRequests(TEST_EMAIL, TEST_PASSWORD);

		cy.get('aside > a[title="Friends"]').click();
		cy.get('nav > a[href*="/friends/invites"]').contains('Invites').click();
	});

	it('accept user to friends', () => {
		cy.clickButtonAndExpectMessage('Accept', 'Request accepted', 'friendship/accept', 200);
	});

	it('cannot accept user to friends', () => {
		cy.clickButtonAndExpectMessage('Accept', 'Something went wrong', 'friendship/accept', 422);
	});

	it("reject user's invitation", () => {
		cy.clickButtonAndExpectMessage('Reject', 'Request rejected', 'friendship/reject', 200);
	});

	it("cannot reject user's invitation", () => {
		cy.clickButtonAndExpectMessage('Reject', 'Something went wrong', 'friendship/reject', 422);
	});
});

export {};
