/// <reference path="./index.d.ts" />

const BACKEND_URL = Cypress.env('backend_url');

Cypress.Commands.add('checkUserRequest', (alias, statusCode = 200) => {
	cy.intercept('GET', `${BACKEND_URL}/api/user`).as(alias);

	cy.wait(`@${alias}`, { timeout: 20000 }).then(user => {
		expect(user.response?.statusCode).to.eq(statusCode);
	});
});

Cypress.Commands.add('loginAndWaitForRequests', (email, password, statusCode = 204) => {
	cy.intercept('GET', `${BACKEND_URL}/sanctum/csrf-cookie`).as('csrf');
	cy.intercept('POST', `${BACKEND_URL}/login`).as('login');

	cy.visit('/login', { failOnStatusCode: false });

	cy.get('input[name="email"]').type(email);
	cy.get('input[name="password"]').type(password);

	cy.get('button[type="submit"]').click().should('be.disabled');

	cy.wait(['@csrf', '@login']).spread((csrf, login) => {
		expect(csrf.response?.statusCode).to.eq(204);
		expect(login.response?.statusCode).to.eq(statusCode);

		const userLoggedOutStatusCode = statusCode.toString().startsWith('2') ? 200 : 401;
		cy.checkUserRequest('isUserLogged', userLoggedOutStatusCode);
	});
});

Cypress.Commands.add('clickButtonAndExpectMessage', (buttonTitle, message, route, statusCode) => {
	if (statusCode.toString().startsWith('4')) {
		cy.intercept('POST', `${BACKEND_URL}/api/${route}`, { statusCode });
	}

	cy.get('div[data-testid="friends-list"]')
		.children()
		.first()
		.within(() => {
			cy.get('button').contains(buttonTitle).click();
		})
		.contains(message);
});

export {};
